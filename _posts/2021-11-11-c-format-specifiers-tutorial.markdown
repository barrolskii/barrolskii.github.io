---
layout: post
title:  "C Format Specifiers Tutorial"
date:   2021-11-11 12:00:00 +0000
categories: C Tutorial
---

The C programming language has some nice options when it comes to
formatting output on the terminal and I've noticed that most tutorials
covering format specifiers don't show some of the nicer things you can
do with them. This tutorial will show a list of format specifiers and
will show examples for each one with what it outputs to the terminal.

## List of format specifiers

| Specifier | Description                   |
|-----------+-------------------------------|
| %c        | Prints character              |
| %d        | Prints signed integer         |
| %e        | Scientific notation for float |
| %E        | Scientific notation for float |
| %f        | Float                         |
| %g        | Float to third decimal place  |
| %G        | Float to third decimal place  |
| %hi       | Signed short                  |
| %hu       | Unsigned short                |
| %i        | Unsigned integer              |
| %l        | Long                          |
| %ld       | Long                          |
| %li       | Long                          |
| %lf       | Long double                   |
| %Lf       | Long double                   |
| %lli      | Long long                     |
| %lld      | Long long                     |
| %llu      | Unsigned long long            |
| %o        | Octal representation          |
| %p        | Pointer                       |
| %s        | String                        |
| %u        | Unsigned int                  |
| %x        | Hexadecimal representation    |
| %X        | Hexadecimal representation    |
| %n        | Prints nothing                |
| %%        | Prints percent character      |

From here I'll show some example code and the output from that code at
just underneath it. We'll start with character and signed integer:

## Character and signed integer

```c
char c = 'c';
int  i = 3;

printf("%c\n", c);
printf("%d\n", i);
```

```shell
c
3
```

## Float

```c
float f = 123.4567890f;

printf("%e\n", f);
printf("%E\n", f);
printf("%f\n", f);
printf("%g\n", f);
printf("%G\n", f);
```

```shell
1.234568e+02
1.234568E+02
123.456787
123.457
123.457
```

## Signed and unsigned short

```c
short s = -6;
unsigned short us = 6;

printf("%hi\n", s);
printf("%hu\n", us);
```

```
-6
6
```

## Unsigned integer

```c
unsigned int i = 3;

printf("%i\n", i);
```

```shell
3
```

## Long

```c
long l = 1234567;

printf("%l\n",  l);
printf("%ld\n", l);
printf("%li\n", l);
```

```shell
%
1234567
1234567
```

## Double

```c
double d = 987.654321;

printf("%lf\n", d);
```

```shell
987.654321
```

## Long double

```c
long double ld = 987.654321;

printf("%Lf\n", ld);
```

```shell
987.654321
```

## Long long and unsigned long long

```c
long long ll = -123456789;
unsigned long long ull= 123456789;

printf("%lli\n", ll);
printf("%lld\n", ll);

printf("%llu\n", ull);
```

```shell
-123456789
-123456789
123456789
```

## Octal representation

```c
printf("%o\n", 69);
```

```shell
105
```

## Pointer

```c
int i = 3;
int *ptr = &i;


printf("%p\n", ptr);
```

```shell
0x7ffd24a1cdcc
```

## String

```c
char *s = "Hello, world!";

printf("%s\n", s);
```

```shell
Hello, world!
```

## Unsigned integer

```c
unsigned int ui = 3;

printf("%u\n", ui);
```

```shell
3
```

## Hexadecimal representation

```c
int i = -3;

printf("%x\n", i);
printf("%X\n", i);
```

```shell
fffffffd
FFFFFFFD
```

## Other

```c
int i = 3;
int *ptr = &i;

printf("%n\n", ptr);
printf("%%\n");
```

```shell
 
%
```

## Formatting tricks

There are a few other flags you can add to a format specifier to format
output to specific needs. These are '*', '.', and '-'. You can also
supply a number just after the % character to add spacing to the
formatted output.

## Left alignment

By supplying a numerical value after the % character you will align
values from the left. All this does is add spacing in front of the
formatted values so the line up. This only works if the supplied
values are equal to or less than the supplied numerical value. Below
is an example with three different strings all set to be left aligned.


```c
char *str_one       = "Hello, World!";
char *str_two       = "Hello there, World!";
char *str_three     = "Why hello again, World!";

printf("%20s ==\n", str_one);
printf("%20s ==\n", str_two);
printf("%20s ==\n", str_three);
```

```shell
       Hello, World! ==
 Hello there, World! ==
Why hello again, World! ==
```

As you can see, the first two strings are aligned properly. The two
equals signs have been added to the output to show how the alignment.
The third string however is not correctly aligned because the length
of the string is greater than 20 characters.

## Right alignment

When you supply the minus (-) sign just after the % character this
will align values to the right. It works exactly like the left alignment
where it will put spaces after the formatted values.

```c
char *str_one       = "Hello, World!";
char *str_two       = "Hello there, World!";
char *str_three     = "Why hello again, World!";


printf("%-20s ==\n", str_one);
printf("%-20s ==\n", str_two);
printf("%-20s ==\n", str_three);
```

```shell
Hello, World!        ==
Hello there, World!  ==
Why hello again, World! ==
```

Similarly to the left alignment, the first and second strings have
been aligned correctly but the third string has not. Again this is due
to the length of the third string being greater than the supplied length
for the format specifier.

## Variable length formatting

Instead of supplying a number after the % character, you can
actually use values of variables. You can do this by supplying an
asterisk (*) after the % character.

```c
char *str = "Hello, World!";

int len_one = 20;
int len_two = 15;

printf("%*s ==\n", len_one, str);
printf("%*s ==\n", len_two, str);
```

```shell
     Hello, World! ==
Hello, World! ==
```

When using the asterisk, the first argument you'll have to pass after
the format string will have to be the variable length. As you can see
from the output the left alignment for each printf call as been aligned
differently. You can also combine the asterisk with the right alignment
minus as well. It would look more like this:

```c
char *str = "Hello, World!";

printf("%-*s ==\n", 20, str);
printf("%-*s ==\n", 15, str);
```

```shell
Hello, World!        ==
Hello, World!   ==
```

## Truncate length

You also have the option to truncate or shorten the formatted value.
By using the period (.) after the % character and then supplying a number the formatting will remove any trailing characters. This also works with the asterisk variable formatting.

```c
char *str_one       = "Hello, World!";
char *str_two       = "Hello there, World!";
char *str_three     = "Why hello again, World!";

printf("%.10s ==\n", str_one);
printf("%.10s ==\n", str_two);
printf("%.10s ==\n", str_three);
```

```shell
Hello, Wor ==
Hello ther ==
Why hello  ==
```

In this example output as all of the supplied strings are longer than
the length of the truncation length so none of them are printed in full.
Here's an example of the variable length with the truncation:

```c
char *str_one       = "Hello, World!";
char *str_two       = "Hello there, World!";
char *str_three     = "Why hello again, World!";

int len = 12;

printf("%.*s ==\n", len, str_one);
printf("%.*s ==\n", len, str_two);
printf("%.*s ==\n", len, str_three);
```

```
Hello, World ==
Hello there, ==
Why hello ag ==
```
