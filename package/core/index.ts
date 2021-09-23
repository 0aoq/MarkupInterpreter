/*
    === 0aoq/MarkupInterpreter (https://0aoq.github.io/markup) ===
    Licensed under the MIT license, more information avaliable 
    on the github.

    Entry point for the package.
    === 0aoq/MarkupInterpreter (https://0aoq.github.io/markup) === 
*/

// MARKUP LANGUAGE CREATOR

// Variables

const fs = require("fs")
const path = require("path")

// Imports

import { parse } from './parse.js'

// Functions

export const parseFile = function(langName: string, path_to_file: string, withTags: any) { parse(langName, path_to_file, withTags) }

/*
    === Function ===
    defineLanguage:
        lang: The language information JSON. Example in [../../tests/index.test.js]
*/
export const defineLanguage = function(lang) {
    if (!lang[0].name) { return console.error("Language definition must include a name.") }

    let x = []

    for (let datapoint of lang) {
        x.push(datapoint)
    }

    fs.writeFile(path.resolve(__dirname, "../data") + "/" + lang[0].name + ".json", JSON.stringify(x), (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log("Defined language!")
        }
    })
}

export default {
    parseFile,
    defineLanguage
}