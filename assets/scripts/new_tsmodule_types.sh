#!/bin/bash
#
# Creates a .d.ts file from a give file
# Arguments:
#   One or more paths to JavaScript modules to generate TypeScript info for

# Check to see if a pipe exists on stdin
if [ -p /dev/stdin ]; then
    while IFS= read line; do
        tsc --declaration --allowJs --emitDeclarationOnly $line
    done
else
    if [ -f "$1" ]; then
        for module in "$@"
        do
            tsc --declaration --allowJs --emitDeclarationOnly $module
        done
    else
        echo "No arguments given" >&2
    fi
fi
