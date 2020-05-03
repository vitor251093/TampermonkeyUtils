// ==UserScript==
// @name         All
// @namespace    https://github.com/vitor251093/TampermonkeyUtils
// @version      1.0
// @description  TMU is a really small lib that helps you to write the most common Tampermonkey scripts in a faster way
// @author       VitorMM
// @match        *://*/*
// @grant        none
// ==/UserScript==

window.tmu = {
    el: function(id) {
        var that = this;
        if (Array.isArray(id)) {
            return id.map(realId => that.el(realId)).flat();
        }
        if (id instanceof Element || id instanceof HTMLDocument) {
            return [id];
        }
        if (!this.isEmpty(id.id)) {
            return [document.getElementById(id.id)];
        }
        if (!this.isEmpty(id.className)) {
            return Array.from(document.getElementsByClassName(id.className));
        }
        if (!this.isEmpty(id.tag)) {
            return Array.from(document.getElementsByTagName(id.tag.toUpperCase()));
        }
        return [];
    },
    _lambda: function(id, callback, exceptionCallback) {
        callback(id);
        return {
            exceptions: function(exId) {
                if (typeof exId === 'string') {
                    if (typeof id !== 'string') {
                        return;
                    }
                    return exceptionCallback(id + exId);
                }
                if (Array.isArray(exId)) {
                    return exId.forEach(realId => {
                        if (typeof realId === 'string') {
                            if (typeof id !== 'string') {
                                return;
                            }
                            return exceptionCallback(id + realId);
                        }
                        return exceptionCallback(realId);
                    });
                }
                return exceptionCallback(exId);
            }
        };
    },


    parent: function(el, filterObj) {
        var parent = el.parentElement;
        if (this.isEmpty(parent)) return null;

        if (!this.isEmpty(filterObj)) {
            if (!this.isEmpty(filterObj.id)) {
                if (parent.id.toUpperCase() === filterObj.id.toUpperCase()) return parent;
                return this.parent(parent, filterObj);
            }
            if (!this.isEmpty(filterObj.className)) {
                if (Array.from(parent.classList)
                    .map(classItem => classItem.toUpperCase() === filterObj.className.toUpperCase())
                    .includes(true)) return parent;
                return this.parent(parent, filterObj);
            }
            if (!this.isEmpty(filterObj.tag)) {
                if (parent.tagName.toUpperCase() === filterObj.tag.toUpperCase()) return parent;
                return this.parent(parent, filterObj);
            }
        }
        return parent;
    },
    anyClassMatches: function(el, func) {
        return Array.from(el.classList).map(classItem => func(classItem)).includes(true);
    },



    remove: function(id, opts) {
        var that = this;
        if (this.isEmpty(opts)) opts = {};
        if (!this.isEmpty(opts.loop)) {
            var loop = opts.loop;
            delete opts.loop;
            return this.loop(loop, () => {that.remove(id,opts)});
        }

        var exceptions = this.isEmpty(opts.exceptions) ? [] : this.el(opts.exceptions);
        this.el(id).filter(el => !exceptions.includes(el)).forEach(el => el.remove());
    },
    addStyle: function(styleVal) {
        var style = this._styleEl;
        if (style === undefined) {
            style = document.createElement('style');
            document.head.appendChild(style);
            this._styleEl = style;
        }
        style.innerHTML += styleVal;
    },
    css: function(id, key, value, opts) {
        var that = this;
        if (this.isEmpty(opts)) opts = {};
        if (!this.isEmpty(opts.loop)) {
            var loop = opts.loop;
            delete opts.loop;
            return this.loop(loop, () => {that.css(id,key,value,opts)});
        }

        if (typeof id === 'string') {
            return this.addStyle(id + " {" + key + ":" + value + (opts.important?" !important":"") + ";}");
        }
        if (Array.isArray(id)) {
            return id.forEach(realId => that.css(realId, key, value, opts));
        }
        this.el(id).forEach(realId => {
            realId.style = (realId.style || "") + "; " + key + ":" + value + (opts.important?" !important":"") + "; ";
        });
    },
    hide: function(id, opts) {
        var that = this;
        if (this.isEmpty(opts)) opts = {};
        if (!this.isEmpty(opts.loop)) {
            var loop = opts.loop;
            delete opts.loop;
            return this.loop(loop, () => {that.hide(id,opts)});
        }

        return this._lambda(id, realId => that.css(realId,      "display", "none",  {important:true}),
                           exceptionId => that.css(exceptionId, "display", "block", {important:true}));
    },


    isEmpty: function(val) {
        return val === undefined || val === null;
    },
    loop: function(seconds, func) {
        var loopFunc = function() {
            func();
            setTimeout(loopFunc, seconds*1000);
        };
        loopFunc();
    }
};
