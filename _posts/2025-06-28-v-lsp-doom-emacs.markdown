---
layout: post
title:  "Doom Emacs V Language Server Setup"
date:   2025-06-28 16:00:00 +0000
categories: Doom Emacs V
---

If you're unsure or unfamiliar with how to set up a language server for doom emacs this tutorial will show you
how to set one up for the V programming language.

## How To

First you will need to enable lsp in doom emacs. You can do this by opening you init.el file and search for the 
tools section. Once you have found that just uncomment the line containing lsp:

```lisp
:tools
       lsp ; Uncomment me!
```

Once that has been uncommented all you need to do then is run doom sync and restart emacs once that command has 
finished:

```bash
doom sync
```

Now you'll need to install the language server for V. I won't be explaining how to do this in this tutorial but
here's the [link](https://github.com/vlang/v-analyzer) to the GitHub page which covers the installation steps.

Once the language server has been set up you will need to add the following hook and set the following 
variable to your config.el file:

```lisp
(setq lsp-v-analyzer-path "~/.config/v-analyzer/bin/v-analyzer") ; This path might not be the same on your 
                                                                 ; system so check where the analyzer is 
                                                                 ; installed and set this value to that path
(add-hook 'v-mode-hook #'lsp!)
```

Once that has been added, refresh your config and you should have a working language server for V!

## Aside
If you don't have the v-mode package for your emacs installation you can add it by simply adding this to your
packages.el file:

```lisp
(package! v-mode)
```
