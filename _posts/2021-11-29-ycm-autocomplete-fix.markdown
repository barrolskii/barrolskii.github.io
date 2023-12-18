---
layout: post
title:  "YCM Autocomplete Fix"
date:   2021-11-29 12:00:00 +0000
categories: Vim Tutorial
---

I’ll get straight to the point here, if you’ve installed the
[YouCompleteMe](https://github.com/ycm-core/YouCompleteMe) plugin for
Vim and/or Neovim, you might’ve run into a problem with C and/or C++ auto-completion
suggestions. The big issue you may have run into just like me and a bunch of other people
is that you’re not getting standard library suggestions and language syntax suggestions.
I’ve found a way to fix it.

## The Fix

The fix itself is really simple. Put this snippet of code into your .vimrc or your
init.vim file if you use Neovim:

```vimscript
let g:ycm_semantic_triggers = {
	\ 'c': [
	\	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
	\	'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
	\	'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
	\	'y', 'z'],
\}
```

This might be a bit of a hacky way to do it. So what this does is sets all the
lexicographic characters to trigger ycm. By default for C and C++ has the dot (.)
and arrow (->) operators as the semantic triggers. As these are the default for the
languages, you don’t need to add them to our list. Now I’m not sure if this is the
best way to get the auto-completion to work but I found this way it actually suggests
standard library functions and primative types and functions I’ve already declared.
It’ll also show function arguments instead of just showing the function name.

If you want this to work with C and C++ you just have to add C++ like this:

```vimscript
let g:ycm_semantic_triggers = {
	\ 'c,cpp': [
	\	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
	\	'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
	\	'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
	\	'y', 'z'],
\}
```

There is one thing that you need to make sure you have. For ycm to work for a project,
it requires you to have a .ycm_extra_conf.py file for each project. I don’t do this,
I have a config file for each langauge in a config directory and source that when I
edit a file based on its extension, like so:

```vimscript
augroup filetype_c
	autocmd!

	let g:ycm_global_ycm_extra_conf = '~/.config/nvim/config/.ycm_c_conf.py'

	...
augroup END
```

I won’t go over the setup of a ycm conf file here but there’s an exmaple on the ycm
[GitHub](https://github.com/rasendubi/dotfiles/blob/master/.vim/.ycm_extra_conf.py#L51).
I’ve also based my config off
[this](https://github.com/rasendubi/dotfiles/blob/master/.vim/.ycm_extra_conf.py)
config on GitHub. You do have to change
some things in the flags list and that’s the ’-std’ and ’x’ flags. These change
depending on which version of C and C++ you’re using. Here’s what I have for C:

```python
BASE_FLAGS = [
        '-Wall',
        '-Wextra',
        '-Werror',
        '-Wno-long-long',
        '-Wno-variadic-macros',
        '-fexceptions',
        '-ferror-limit=10000',
        '-DNDEBUG',
        '-std=c99',
        '-xc',
        '-DUSE_CLANG_COMPLETER',
        '-I/usr/include/'
        ]
```

Here’s what I currently have for C++:

```python
BASE_FLAGS = [
    '-Wall',
    '-Wextra',
    '-Werror',
    '-Wno-long-long',
    '-Wno-variadic-macros',
    '-fexceptions',
    '-ferror-limit=10000',
    '-DNDEBUG',
    '-std=c++11',
    '-xc++',
    '-DUSE_CLANG_COMPLETER',
    '-I/usr/include/'
    ]
```

Hopefully that has fixed the problem for you as it did for me. I’ve seen a few posts
online and a few videos on YouTube of people saying they haven’t been able to get ycm
to work for C and C++. Again I don’t know if this is the best way to get this to work
but it can stay as a workaround for now until someone finds a better way to do so.
