---
layout: post
title:  "Doom Emacs Icons Fix"
date:   2021-11-11 13:00:00 +0000
categories: Doom Emacs
---

After a fresh install of Doom Emacs on Windows you’ll notice when you boot Emacs up that there are
icons missing on the side of the doom dashboard and at the bottom where the official GitHub repository
is linked. I’m going to go over how to fix that in this tutorial.

## The Fix

The issue is simply due to missing font packages in Windows. To download the fonts you have to
press meta-x (the meta key by default is the alt key) and then type:

```lisp
all-the-icons-install-fonts
```

You will also need:

```lisp
nerd-icons-install-fonts
```

### Windows
On Windows this will ask you to provide a directory for the font files to be downloaded to.
Once you’ve provided a directory you’ll then need to open PowerShell and then cd into the
directory where the font files have been downloaded. Once you’ve navigated there you’ll
then have to run this snippet of code:

```powershell
$dest = (New-Object -ComObject Shell.Application).Namespace(0x14)
ls *.ttf | % { $dest.CopyHere($_.FullName, 0x10) }
```

Once you’ve run that a few pop up windows should appear showing the installation of each font.
When the fonts have been installed all you have to do then is restart Doom Emacs (which can
be done by pressing space q r) and then the icons will show up without any issue

## Sources

- [Doom Emacs all-the-icons in Windows](https://github.com/doomemacs/doomemacs/issues/2575)
- [Special folders in Windows 0x14](https://richardspowershellblog.wordpress.com/2008/03/20/special-folders)
- [Special folders in Windows 0x10](https://docs.microsoft.com/en-us/previous-versions/tn-archive/ee176633(v=technet.10))
