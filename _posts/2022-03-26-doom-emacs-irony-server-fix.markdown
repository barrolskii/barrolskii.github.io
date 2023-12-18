---
layout: post
title:  "Doom Emacs Irony Server Fix"
date:   2022-03-26 12:00:00 +0000
categories: Doom Emacs
---

If you want code completion for C/C++ when using Doom Emacs you are going to need
a language server. The default for this is irony and if you run the setup function
in Doom Emacs it’ll compile the server and set it up for you. In Windows you might
not be able to compile the server from inside Emacs if you don’t have the required
dependencies installed. This tutorial will cover what irony needs to be able to compile
on Windows through Emacs.

## The Fix

You’ll need to install 2 things:

- [Clang](https://releases.llvm.org/download.html)
- [CMake](https://cmake.org/download/)

All you’ll need to do is download the latest installer for both clang and cmake
and run through the installer. MAKE SURE THAT YOU ADD THEM TO YOUR PATH ENVIRONMENT
VARIABLE! The installers will ask you if you want to add them to the path of all
users or just the current one. It doesn’t matter which one you choose just as long
as they get added to PATH. If you don’t do this then the underlying terminal emulator
that emacs uses won’t be able to run those programs. One they have been installed
you can run irony-install-server and have code completion working for C/C++ on Windows!
