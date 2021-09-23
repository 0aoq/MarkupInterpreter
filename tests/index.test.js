// creates basic language

const package = require("../package/core/index.js")

package.defineLanguage([{
    definitionType: "language",
    name: "testlang",
    version: "0.0.1",
}, {
    definitionType: "tag",
    name: "test",
}, {
    definitionType: "tag",
    name: "test2",
}])

package.parseFile("testlang", "tests/index.testlang", (tags) => {
    for (let tag of tags) {
        console.log(tag.name)
    }
})