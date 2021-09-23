/*
    === 0aoq/MarkupInterpreter (https://0aoq.github.io/markup) ===
    Licensed under the MIT license, more information avaliable 
    on the github.

    Primary markup file interpreter.
    === 0aoq/MarkupInterpreter (https://0aoq.github.io/markup) === 
*/

const fs = require('fs')
const path = require('path')

/*
    === Function ===
    parse:
        langName: The name of the language in use
        path_to_file: The path of the file that will be interpreted
        withTags: What to do when all tags have been found
*/
export const parse = function (langName: string, path_to_file: string, withTags: any) {
    setTimeout(() => {
        try {
            path_to_file = path.resolve(process.cwd(), path_to_file)
            const $langName = path.resolve(__dirname, "../data") + "/" + langName + ".json"
            if (fs.existsSync(path.resolve(path_to_file)) && fs.existsSync($langName)) {
                fs.readFile($langName, 'utf-8', function (err, lang) {
                    lang = JSON.parse(lang)
                    if (err) {
                        return console.error(err)
                    }

                    let tags = []

                    fs.readFile(path.resolve(path_to_file), 'utf-8', function (err, data) {
                        if (err) {
                            console.log(err)
                        }

                        let __init = false
                        data.split(/\r?\n/).forEach((line) => {
                            line = line.replace("    ", "") // remove \t spaces
                            line = line.replace("\t", "") // remove \t spaces

                            if (line === `<${lang[0].name}>`) {
                                __init = true
                            } else if (line === `</${lang[0].name}>`) {
                                __init = false
                            }

                            if (
                                __init &&
                                line.split(" ")[0] != "#" &&
                                line !== `<${lang[0].name}>` &&
                                line !== `</${lang[0].name}>`
                            ) {
                                if (line.split(">")[0].split("<")[1][0] === "/") { return }
                                let tag = line.split(">")

                                let $ = []
                                let $_ = []

                                for (let $tag of tag) {
                                    $.push($tag.split("<"))
                                }

                                let __full_tag_save = $[0][1] // test mod="Hello, world!"

                                if ($[1]) {
                                    $_.push($[0][1].split(" ")[0], $[1][0], $[1][1]) // combine all datapoints, example: ["tag", "data", "/tag"]
                                    tag = $_

                                    let data = tag[1]

                                    if (data) {
                                        if (data === "?") { tag[2] = `/${tag[0]}` } // for nested items
                                        tags.push({
                                            definitionType: "tag",
                                            name: tag[0],
                                            value: data,
                                            getValue: function (name) {
                                                const __ = __full_tag_save.split(`${name}="`)[1]
                                                if (__) { return __.split('"')[0] } else { return }
                                            }
                                        })
                                    }
                                }
                            }
                        })
                    })

                    setTimeout(() => { if (withTags) { withTags(tags) } }, 10);
                    return tags
                })
            } else {return console.error(`Path to file doesn't exist.\nPATH: ${path_to_file}`)}
        } catch (err) {
            return console.error(`Path to file doesn't exist.\nPATH: ${path_to_file}`)
        }
    }, 1);
}

export default {
    parse
}