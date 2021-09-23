# Markup Interpreter

A basic custom markup language interpreter for interpreting custom markup languages with custom values.

Currently supports a simple system for getting information out of custom markup files that includes the value of the tag, the tag name, and a function to get values from name.

Below is the example on using the information from the interpreter to get the value of a value named "testing"

From `tests/index.test.js`
```js
markupCreator.parseFile("testlang", "tests/index.testlang", (tags) => {
    for (let tag of tags) {
        console.log(tag.name) // logs the name of every tag included in the document
    }
})
```

### **Provided markup file:**
From `tests/index.testlang`
```xml
<testlang>
    <test mod="Hello, world!">?
        <test2 mod="Hello, world! (2)">1234</test2>
    </test>
</testlang>
```

### **Expected result:**
```
> test
> test2
```
All file opening tags and closing tags that are just the name of the language in use wil be ignored when returning information from the interpreter.

## Important Notice

This is just a basic test of this system, and I will be improving it later on. Don't expect anything too much from this, as it is just a basic first draft so far.