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
| tmu.el(params) | Shorten document.getElement* functions, depending of the parameters |
| tmu.parent(el, params) | Returns a parent of a certain element (the first that matches with its parameters)  |
| tmu.anyClassMatches(el, func) | Returns if one of the classes of a certain element returns true for func |
| tmu.remove(params) | Remove the elements that match with the parameters |
| tmu.hide(id) | Hides a specific element, an array of elements, or element(s) by their CSS identifier. It also returns an object with an `exception` function, which lets you specify exceptions to your `hide` command |
| tmu.loop(seconds, func) | Runs the specified function each X seconds |

And those are its "advanced" features, for those with knowledge in CSS:
|               Function               | Description |
|:------------------------------------:|:-----------:|
| tmu.addStyle(style) | Adds CSS content to the page |
| tmu.css(id, key, value) | Add a style to a specific element, to an array of elements, or to an element CSS identifier |

## Could you give me some examples?
Check EXAMPLES.md.
