# TampermonkeyUtils
TMU is a really small lib that helps you to write the most common Tampermonkey scripts in a faster way

## How do I use it?
Create a new userscript with the contents of tmu.js, and move it to the top of your load order. That should make it available for all of your scripts. You can also update the default userscript in Settings -> Userscripts to include that new line:
```
(function() {
    'use strict';
    var tmu = window.tmu; // new line

    // Your code here...
})();
```

## Which functions does it provide?
Those are its regular use features:
|               Function               | Description |
|:------------------------------------:|:-----------:|
| tmu.removeElements(list) | Remove all the elements in the given list (it doesn't need to be an Array) |
| tmu.removeElementById(id) | Remove the element with the matching ID |
| tmu.removeElementsByTagName(tagName) | Remove the elements with specified tag |
| tmu.removeElementsByClassName(className) | Remove the elements with specified class |
| tmu.hide(id) | Hides a specific element, an array of elements, or element(s) by their CSS identifier |
| tmu.loop(seconds, func) | Runs the specified function each X seconds |

And those are its "advanced" features, for those with knowledge in CSS:
|               Function               | Description |
|:------------------------------------:|:-----------:|
| tmu.addStyle(style) | Adds CSS content to the page |
| tmu.css(id, key, value) | Add a style to a specific element, to an array of elements, or to an element CSS identifier |
