/*
 * This file is part of Mixcloud Tracklist extension
 *
 * Copyright (c) 2015 Andrew Lawson <http://adlawson.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/* globals chrome, clearInterval, document, require, window, Array */

var constants = require('../../src/constants');
var fetch = require('../../src/fetch');
var render = require('../../src/template');

function documentReady(fn) {
    chrome.extension.sendMessage({}, function (response) {
        var readyStateCheckInterval = setInterval(function () {
            if (document.readyState === 'complete') {
                clearInterval(readyStateCheckInterval);
                fn();
            }
        }, 10);
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

documentReady(function () {
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
