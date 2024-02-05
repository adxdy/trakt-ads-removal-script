// ==UserScript==
// @name         trakt.tv ads removal script
// @icon         https://www.google.com/s2/favicons?sz=64&domain=trakt.tv
// @namespace    adtitas
// @version      1.0.0
// @description  remove the annoying sticky ads from trakt.tv
// @include      *://trakt.tv/*
// @grant        none
// @author       adtitas
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function removeDivsById(ids) {
        Object.keys(ids).forEach(function(key) {
            var id = ids[key];
            var elements = document.querySelectorAll('div[id="' + id + '"]');
            elements.forEach(function(element) {
                element.remove();
            });
        });
    }

    var scriptTags = document.querySelectorAll('script');
    var parzivalItemNames = {};

    scriptTags.forEach(function(tag) {
        var innerText = tag.innerText;
        if (innerText.includes('parzivalItemNames')) {
            var startIndex = innerText.indexOf('{');
            var endIndex = innerText.lastIndexOf('}');
            var parzivalObj = innerText.substring(startIndex, endIndex + 1);
            eval('parzivalItemNames = ' + parzivalObj);
        }
    });

    removeDivsById(parzivalItemNames);
})();