<#
.SYNOPSIS
    Creates a .d.ts file from a given file or files

.PARAMETER Module
    Paths to the JavaScript module to generate the TypeScript info for
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$True, ValueFromPipeline=$True)]
    [string]$Module
)

process {
    # We need to put this in a process block otherwise we can't process
    # multiple modules passed by piping them into this script
    tsc --declaration --allowJs --emitDeclarationOnly $Module
}
