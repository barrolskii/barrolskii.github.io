---
layout: post
title:  "PowerShell Tidbits"
date:   2024-09-16 12:00:00 +0000
categories: PowerShell Windows
---

I've been working with PowerShell for a while now and there are a lot of features and gotchyas that people
aren't really aware of ,so I thought it would be a good idea to get some of these things written down and
out there so people can know about them.

## PowerShell Features

### List Suggestions

If you press Ctrl + Space you can get suggestions in a browsable format. This works for listing files in a
directory, arguments to a cmdlet or script, and cmdlets themselves. Try pressing Ctrl + Space in different
places and see what PowerShell can suggest!

![Suggestion List](/assets/img/PowerShellTidbits/SuggestionList.png)

### Interactive Command History Search

If you press Ctrl + R you can do a backwards search through your command history. This is especially useful if
you know you've entered a particular command but can't exactly remember it. You don't have to limit yourself
to only a command. If you start typing anything the search will try and match what it can through your history.
This means you can start typing an argument or a value to an argument and it will show you the entire command
that you ran. If you keep pressing Ctrl + R when you have a match it'll scroll through all the matches you have.

![Backwards Search](/assets/img/PowerShellTidbits/BackwardsSearch.png)

## Language Features

### Function Return Types

The following function does not always return an array:

```powershell
function My-Function
{
    [OutputType([Array])]
    param(
        [string[]]$MyParam
    )
    
    # Do something...
    
    return $MyParam
}
```

If you try and return an array from a function but the array contains 1 element, PowerShell will automatically
convert the type into a single object rather than an object array. This is rather annoying default behaviour
of PowerShell and even though we are explicitly specifying that we are returning an array, PowerShell will
ignore the output type and convert it anyway. To handle cases like these make sure you are capturing the return
value into a variable and setting the type of that variable as an array:

``` powershell
[Array]$MyVar = (My-Function 'foo')
```

