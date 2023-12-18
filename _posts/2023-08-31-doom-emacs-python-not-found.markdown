---
layout: post
title:  "Doom Emacs Python Not Found Fix For Windows"
date:   2023-08-31 12:00:00 +0000
categories: Doom Emacs
---

When writing Python in Emacs you may run into an issue on Windows that says:

```shell
Python was not found; run without arguments to install from the Microsoft Store, or disable this shortcut from Settings
```

This issue is simply due to the Python installer using an app execution alias by default.

## The Fix

To fix this error you will need to do the following:

1. Open the Windows start menu
2. Type ’Manage app execution aliases’
![Step 1](/assets/img/PythonFix/Step1.png)

3. Open the program
4. Disable the Python app installer (in my case I had to switch off both Python and Python 3)
![Step 2](/assets/img/PythonFix/Step2.png)

5. Restart Emacs and the error should stop appearing!
