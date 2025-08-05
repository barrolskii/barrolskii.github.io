#!/bin/bash
#
# Creates a markdown documentation page from a given path to a directory containing
# a JavaScript module
# Arguments:
#   One or more paths to the directory containing the JavaScript modules
#   to generate documentation for

# Check to see if a pipe exists on stdin
if [ -p /dev/stdin ]; then
    while IFS= read module; do
        #tsc --declaration --allowJs --emitDeclarationOnly $line
        echo "Updating $module"
        jsdoc2md $module/*.js > $module/docs.md
    done
else
    if [ -d "$1" ]; then
        for module in "$@"
        do
            echo "Updating $module"
            jsdoc2md $module/*.js > $module/docs.md
        done
    else
        echo "No arguments given" >&2
    fi
fi
