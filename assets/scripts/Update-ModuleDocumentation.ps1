<#
.SYNOPSIS
    Updates (or creates if not present) documentation for JavaScript modules

.PARAMETER ModulesDirectory
    Path to the directory that contains the JavaScript module/s to generate documentation for
#>

param(
    [Parameter(Mandatory=$True, ValueFromPipeline=$True)]
    [string]$ModulesDirectory
)

begin {
    $originalEncoding = $OutputEncoding
    $originalInput = [console]::InputEncoding
    $originalOutput = [console]::OutputEncoding

    # We need to set the encoding here because jsdoc2md uses unicode characters and PowerShell
    # can mess with the output when trying to write to a file
    $OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
}

process {
    jsdoc2md "$ModulesDirectory/*.js" > "$ModulesDirectory/docs.md"
}

end {
    # Set the encoding back to what it was before this script as we don't want to cause any
    # unintended side effects after running this script
    $OutputEncoding = $originalEncoding
    [console]::InputEncoding = $originalInput
    [console]::OutputEncoding = $originalOutput
}
