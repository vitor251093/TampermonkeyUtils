// ==UserScript==
// @name         All
// @namespace    https://github.com/vitor251093/TampermonkeyUtils
// @version      1.0
// @description  TMU is a really small lib that helps you to write the most common Tampermonkey scripts in a faster way
// @author       VitorMM
// @match        *://*/*
// @grant        none
// ==/UserScript==

window.tmu = {};


window.tmu.elementsByTagName = function(tagName) {
    return Array.from(document.getElementsByTagName(tagName));
};
window.tmu.elementsByClassName = function(className) {
    return Array.from(document.getElementsByClassName(className));
};
window.tmu.removeElements = function(list) {
    Array.from(list).forEach(el => el.remove());
};
window.tmu.removeElementById = function(id) {
    document.getElementById(id).remove();
};
window.tmu.removeElementsByTagName = function(tagName) {
    this.removeElements(document.getElementsByTagName(tagName));
};
window.tmu.removeElementsByClassName = function(className) {
    this.removeElements(document.getElementsByClassName(className));
};


window.tmu._lambda = function(id, callback, exceptionCallback) {
    callback(id);
    return {
        exceptions: function(exId) {
            if (typeof id !== 'string') {
                return;
            }
            if (typeof exId === 'string') {
                return exceptionCallback(id + exId);
            }
            if (Array.isArray(exId)) {
                exId.forEach(realId => {
                    if (typeof realId === 'string') {
                        return exceptionCallback(id + realId);
                    }
                    return exceptionCallback(realId);
                });
                return;
            }
            return exceptionCallback(exId);
        }
    };
};


window.tmu._styleEl = undefined;
window.tmu.addStyle = function(styleVal) {
    var style = this._styleEl;
    if (style === undefined) {
        style = document.createElement('style');
        document.head.appendChild(style);
        this._styleEl = style;
    }
    style.innerHTML += styleVal;
};
window.tmu.css = function(id, key, value) {
    if (typeof id === 'string') {
        return this.addStyle(id + " {" + key + ":" + value + " !important;}");
    }
    if (Array.isArray(id)) {
        return id.forEach(realId => window.tmu.css(realId, key, value));
    }
    id.style = (id.style || "") + "; " + key + ":" + value + " !important; ";
};
window.tmu.hide = function(id) {
    return this._lambda(id, realId => window.tmu.css(realId,      "display", "none"),
                       exceptionId => window.tmu.css(exceptionId, "display", "block"));
};


window.tmu.loop = function(seconds, func) {
    var loopFunc = function() {
        func();
        setTimeout(loopFunc, seconds*1000);
    };
    loopFunc();
};
