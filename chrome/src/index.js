/*
 * This file is part of Mixcloud Tracklist extension
 *
 * Copyright (c) 2015 Andrew Lawson <http://adlawson.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/* globals chrome, clearInterval, document, require, window, Array, MutationObserver */

var constants = require('../../src/constants');
var fetch = require('../../src/fetch');
var render = require('../../src/template');

function onDocumentChange(container, fn) {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                fn();
            }
        });
    });
    observer.observe(container, {childList:true});
}

function onDocumentReady(fn) {
    chrome.extension.sendMessage({}, function (response) {
        document.addEventListener('DOMContentLoaded', function () {
            fn();
            onDocumentChange(document.querySelectorAll(constants.QUERY_MAIN)[0], fn);
        });
    });
}

function insertHtml(element, html) {
    element.innerHTML = html;
}

function toggleTracklist(toggle, tracklist) {
    toggle.addEventListener('click', function (event) {
        var hide = toggle.querySelectorAll(constants.QUERY_HIDE)[0];
        var show = toggle.querySelectorAll(constants.QUERY_SHOW)[0];
        hide.classList.toggle(constants.CLASS_HIDE);
        show.classList.toggle(constants.CLASS_HIDE);
        tracklist.classList.toggle(constants.CLASS_OPEN);
    });
}

onDocumentReady(function () {
    fetch(window.location.pathname, function (data) {
        if (data.sections.length > 0) {
            var html = render(data);
            var parentElement = document.querySelectorAll(constants.QUERY_CONTAINER)[0];
            insertHtml(parentElement, html);

            var toggleButton = document.getElementsByClassName(constants.CLASS_TOGGLE)[0];
            var tracklistContainer = document.getElementsByClassName(constants.CLASS_TRACKLIST)[0];
            toggleTracklist(toggleButton, tracklistContainer);
        }
    });
});
