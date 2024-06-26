---
layout: post
title:  "Ncurses And GNU Readline"
date:   2023-07-31 12:00:00 +0000
categories: C Tutorial Ncurses
---

Getting Ncurses and GNU Readline to work together might seem like a bit of a pain
when trying to make a Ncurses application that uses Readline for autocompletion.
This tutorial will walk you through how to set up both libraries so you can easily
have autocompletion in your Ncurses applications.

## Ncurses Setup

To start we’ll set up a basic ncurses program:

```c
#include <ncurses.h>

WINDOW *input_window, *output_window;
int lines, cols;

void init_ncurses(void)
{
    initscr();
    cbreak();
    noecho();
    keypad(stdscr, TRUE);

    getmaxyx(stdscr, lines, cols);

    int start_x = 0;
    int start_y = 0;

    input_window  = newwin(3, cols, lines-3, start_x);
    output_window = newwin(lines - 3, cols, start_y, start_x);

    keypad(input_window, TRUE);
    keypad(output_window, TRUE);

    box(input_window, 0, 0);
    box(output_window, 0, 0);

    refresh();
    wrefresh(input_window);
    wrefresh(output_window);
}

void cleanup_ncurses(void)
{
    delwin(input_window);
    delwin(output_window);
    endwin();
}

void main_loop(void)
{
    int ch = getch();
}

int main(void)
{
    init_ncurses();
    main_loop();
    cleanup_ncurses();
}
```

This program simply draws 2 boxes, one for displaying output and one for accepting
input. We have a main loop function set up too that just waits for us to enter some
input. This will do a bit more later on in the tutorial but for now it just gets a
single character from the user.

## Readline Setup

Next we need to setup readline and change some readline variables to make sure that
it plays nicely with ncurses:

```c
#include <stdbool.h>
#include <stdlib.h>
#include <ncurses.h>
#include <readline/readline.h>

#define UNUSED(x) (void)x

WINDOW *input_window, *output_window;
int lines, cols;

unsigned char input;
bool input_available = false;

void init_ncurses(void)
{
    initscr();
    cbreak();
    noecho();
    keypad(stdscr, TRUE);

    getmaxyx(stdscr, lines, cols);

    int start_x = 0;
    int start_y = 0;

    input_window  = newwin(3, cols, lines-3, start_x);
    output_window = newwin(lines - 3, cols, start_y, start_x);

    keypad(input_window, TRUE);
    keypad(output_window, TRUE);

    box(input_window, 0, 0);
    box(output_window, 0, 0);

    refresh();
    wrefresh(input_window);
    wrefresh(output_window);
}

void cleanup_ncurses(void)
{
    delwin(input_window);
    delwin(output_window);
    endwin();
}

void forward_to_readline(char c)
{
    input = c;
    input_available = true;
    rl_callback_read_char();
}

int readline_getc(FILE *fp)
{
    UNUSED(fp);

    input_available = false;
    return input;
}

int readline_is_input_available(void)
{
    return input_available;
}

void redisplay(void)
{
    werase(input_window);
    box(input_window, 0, 0);
    mvwprintw(input_window, 1, 1, "%s%s", rl_display_prompt, rl_line_buffer);

    wrefresh(input_window);
    wrefresh(output_window);
}

void callback_handler(char *line)
{
    static char *prev_line = NULL;

    if (!line)
        return;

    free(prev_line);
    prev_line = line;

    redisplay();
}

void init_readline(void)
{
    /* Allow ncurses to deal with signal handling and term prep */
    rl_catch_signals  = 0;
    rl_catch_sigwinch = 0;

    rl_prep_term_function   = NULL;
    rl_deprep_term_function = NULL;

    /* Stop readline from changing the lines and cols environment variables */
    rl_change_environment = 0;

    rl_getc_function = readline_getc;
    rl_input_available_hook = readline_is_input_available;
    rl_redisplay_function = redisplay;

    rl_callback_handler_install("> ", callback_handler);
}

void cleanup_readline(void)
{
    rl_callback_handler_remove();
}

void main_loop(void)
{
    int ch = getch();
}

int main(void)
{
    init_ncurses();
    init_readline();

    main_loop();

    cleanup_readline();
    cleanup_ncurses();
}
```

In the init readline function we set the catch signals variables to 0, the term
prep function pointers to NULL, and the change environment variable to 0. This
is so ncurses can handle terminal setup and cleanup along with signal handling.
The next thing we change are the 3 following function pointers:

- rl_getc_function
- rl_input_available_hook
- rl_redisplay_function

These functions are very simple, rl_getc_function is the input handler for
readline to get a single character. rl_input_available_hook is the function that
is used to check if input is available and rl_redisplay_function is used to redraw
the current frame on screen. We will also need to call the function rl_callback_handler_install
as readline does not allow us to use rl_getc_function without having a callback handler.

We’ve added a few new functions to the program and I’ll explain what each of them do.
The forward_to_readline function simply updates the global input character to the
entered character and sets the input_available variable to true. We then call the
rl_callback_read_char function to allow readline to consume the character.

The readline_getc function simply sets the input_available variable to false and
returns the global input character. This is the function that is called when we
call the rl_callback_read_char function. The next two functions are pretty self
explanatory. readline_is_input_available just returns the input_available variable.
We need to wrap this in a function so readline can check if input is actually available.
The redisplay function simply calls wrefresh on both the input and output windows.

The callback_handler function is the function that readline will use when we press the
enter key. The line of text that has been entered will be passed to this function and
it is up to us to do something with it. This function contains a single static variable
called prev_line. This is because we need to keep track of the line as it will be replaced
the next time this function is called. Readline heap allocates the line argument so if we
don’t keep track of the line and free the memory when it is going to be replaced we will
leak memory. That’s why just after the NULL check in the function we’re freeing the prev_line
variable and then setting prev_line to the current line. We only need to free the memory in this
function when we’re replacing the current line. Readline will free the memory that
line was pointing to but won’t free any replacements.

## Updating The Main Loop

Now that we’ve setup both ncurses and readline we can now update the main loop
function to make use of the readline library.

```c
void main_loop(void)
{
    int ch;
    while((ch = wgetch(input_window)))
    {
        switch(ch)
        {
            case KEY_BACKSPACE:
                forward_to_readline(127);
                break;
            default:
                forward_to_readline(ch);
        }
    }
}
```

We are specifically passing the ascii backspace code for delete to readline as
realine expects character codes to be in ascii format.

If you run the program now you’ll be able to use readline but it still won’t be
great to use… If you try pressing tab now readline will just display whatever
files are in the current directory and it will draw over our windows. Let’s fix that!

## Updating Readline Display Options

There is a very easy way to stop readline from printing the possible matches it
finds by passing a callback to the rl_completion_display_matches_hook function
pointer. We simply add this line to the init_readline function:

```c
rl_completion_display_matches_hook = matches_suggestion_display;
```

And the function to display the completion options looks like this:

```c
void matches_suggestion_display(char **matches, int size, int len)
{
    UNUSED(len);
    UNUSED(size);

    werase(output_window);
    box(output_window, 0, 0);

    for (int i = 0; matches[i]; ++i)
        mvwprintw(output_window, 1 + i, 1, "%s", matches[i]);

    wrefresh(output_window);
}
```

## Adding Custom Completion Options

Now when we hit tab to autocomplete Readline will show a list of what is in the
current directory. This is the default behaviour of Readline and for this tutorial
is not really that useful for us so let’s change that! First let’s add a list of
names that we want:

```c
char *my_match_list[] = {
    "Darth Vader",
    "Darth Sidious",
    "Han Solo",
    "Luke Skywalker",
    "Obi Wan Kenobi",
    "Princess Leia",
    NULL /* Last item has to be NULL for Readline */
};
```

Next we want to add 2 new functions. These will handle checking our list of names
and return any and all matches when the user hits tab:

```c
char *matches_completion_generator(const char *text, int state)
{
    static int index, len;
    char *name = NULL;

    if (!state)
    {
        index = 0;
        len = strlen(text);
    }

    while((name = my_match_list[index++]))
    {
        if (strncmp(name, text, len) == 0)
        {
            return strdup(name);
        }
    }

    return NULL;
}

char **match_completion(const char *text, int start, int end)
{
    rl_attempted_completion_over = 1;
    return rl_completion_matches(text, matches_completion_generator);
}
```

Finally we need to update the init_readline function to tell Readline that we
have our own function for dealing with matches. We also modify the
rl_basic_word_break_characters variable so that when we try and tab complete
multiple matches Readline will still attempt to complete the match. If we leave
this as default Realine won’t be able to complete a match that has a space in it
when it has multiple potential matches:

```c
void init_readline(void)
{
    /* Allow ncurses to deal with signal handling and term prep */
    rl_catch_signals  = 0;
    rl_catch_sigwinch = 0;

    rl_prep_term_function   = NULL;
    rl_deprep_term_function = NULL;

    /* Stop readline from changing the lines and cols environment variables */
    rl_change_environment = 0;

    rl_getc_function = readline_getc;
    rl_input_available_hook = readline_is_input_available;
    rl_redisplay_function = redisplay;

    rl_completion_display_matches_hook = matches_suggestion_display;

    rl_attempted_completion_function = match_completion;
    rl_basic_word_break_characters = "";

    rl_callback_handler_install("> ", callback_handler);
}
```

That’s it! Now if you hit tab you will get a list of names from our list!

## The Final Program

Here is the full program if you want to simply copy paste this into your code
editor/IDE of choice to dig about in the code and see it actually run:

```c
#include <stdbool.h>
#include <stdlib.h>
#include <ncurses.h>
#include <readline/readline.h>

#define UNUSED(x) (void)x

WINDOW *input_window, *output_window;
int lines, cols;

unsigned char input;
bool input_available = false;

char *my_match_list[] = {
    "Darth Vader",
    "Darth Sidious",
    "Han Solo",
    "Luke Skywalker",
    "Obi Wan Kenobi",
    "Princess Leia",
    NULL /* Last item has to be NULL for Readline */
};

void init_ncurses(void)
{
    initscr();
    cbreak();
    noecho();
    keypad(stdscr, TRUE);

    getmaxyx(stdscr, lines, cols);

    int start_x = 0;
    int start_y = 0;

    input_window  = newwin(3, cols, lines-3, start_x);
    output_window = newwin(lines - 3, cols, start_y, start_x);

    keypad(input_window, TRUE);
    keypad(output_window, TRUE);

    box(input_window, 0, 0);
    box(output_window, 0, 0);
}

void cleanup_ncurses(void)
{
    delwin(input_window);
    delwin(output_window);
    endwin();
}

void forward_to_readline(char c)
{
    input = c;
    input_available = true;
    rl_callback_read_char();
}

int readline_getc(FILE *fp)
{
    UNUSED(fp);

    input_available = false;
    return input;
}

int readline_is_input_available(void)
{
    return input_available;
}

void redisplay(void)
{
    werase(input_window);
    box(input_window, 0, 0);
    mvwprintw(input_window, 1, 1, "%s%s", rl_display_prompt, rl_line_buffer);

    wrefresh(output_window);
    wrefresh(input_window);
}

void matches_suggestion_display(char **matches, int size, int len)
{
    UNUSED(len);
    UNUSED(size);

    werase(output_window);
    box(output_window, 0, 0);

    for (int i = 0; matches[i]; ++i)
        mvwprintw(output_window, 1 + i, 1, "%s", matches[i]);

    wrefresh(output_window);
}

void callback_handler(char *line)
{
    static char *prev_line = NULL;

    if (!line)
        return;

    free(prev_line);
    prev_line = line;

    redisplay();
}

char *matches_completion_generator(const char *text, int state)
{
    static int index, len;
    char *name = NULL;

    if (!state)
    {
        index = 0;
        len = strlen(text);
    }

    while((name = my_match_list[index++]))
    {
        if (strncmp(name, text, len) == 0)
        {
            return strdup(name);
        }
    }

    return NULL;
}

char **match_completion(const char *text, int start, int end)
{
    UNUSED(start);
    UNUSED(end);

    rl_attempted_completion_over = 1;
    return rl_completion_matches(text, matches_completion_generator);
}

void init_readline(void)
{
    /* Allow ncurses to deal with signal handling and term prep */
    rl_catch_signals  = 0;
    rl_catch_sigwinch = 0;

    rl_prep_term_function   = NULL;
    rl_deprep_term_function = NULL;

    /* Stop readline from changing the lines and cols environment variables */
    rl_change_environment = 0;

    rl_getc_function = readline_getc;
    rl_input_available_hook = readline_is_input_available;
    rl_redisplay_function = redisplay;

    rl_completion_display_matches_hook = matches_suggestion_display;

    rl_attempted_completion_function = match_completion;
    rl_basic_word_break_characters = "";

    rl_callback_handler_install("> ", callback_handler);
}

void cleanup_readline(void)
{
    rl_callback_handler_remove();
}

void main_loop(void)
{
    int ch;
    while((ch = wgetch(input_window)))
    {
        switch(ch)
        {
            case KEY_BACKSPACE:
                forward_to_readline(127);
                break;
            default:
                forward_to_readline(ch);
        }
    }
}

int main(void)
{
    init_ncurses();
    init_readline();

    main_loop();

    cleanup_readline();
    cleanup_ncurses();
}
```
