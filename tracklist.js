/*
 * Mixcloud Tracklist browser extension
 *
 * Copyright (c) 2015 Andrew Lawson <http://adlawson.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @link https://github.com/adlawson/mixcloud-tracklist
 */

'use strict';

require('whatwg-fetch'); // Patches window.fetch
require('url-polyfill'); // Patches window.URL

const dust = require('dustjs-linkedin');
const Promise = require('promise-polyfill');
const browser = require('./browser');

main();
browser.onChange(browser.querySelector('[m-contents="maincontent"]'), main);

function main() {
    const parent = browser.querySelector('[ng-controller="CloudcastHeaderCtrl"]');
    if (parent !== null) {
        fetchData(window.location, (data) => {
            const tracklistTemplate = require('./templates/tracklist')(dust); // Required by both new and legacy
            const empty = parent.querySelector('[ng-init]');
            const toggleContainer = browser.querySelector('footer.actions');
            const moreButton = toggleContainer.querySelector('[ng-controller="DropdownCtrl"]');
            const existingButton = toggleContainer.querySelector('[m-click="tracklistShown=!tracklistShown"]');
            if (existingButton === null) { // If looking at your own mix
                render(tracklistTemplate, data.cloudcast, tracklistHtml => {
                    browser.insert(empty, tracklistHtml);
                    render(require('./templates/toggle')(dust), {}, toggleHtml => {
                        browser.insertBefore(toggleContainer, moreButton, toggleHtml);
                        toggleEvents(empty, toggleContainer);
                    });
                });
            }
        });
    }
}

function fetchData(location, fn) {
  let url = new URL(`${location.protocol}//${location.hostname}/player/details/`);
  url.searchParams.append('key', location.pathname);
  fetch(url, { credentials: 'include' })
    .then(rejectFailed)
    .then(response => response.json())
    .then(data => fn(insertTrackNumber(data)))
    .catch(err => console.error('Request failed', err));
}

function rejectFailed(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function insertTrackNumber(data) {
    data.cloudcast.sections.forEach((section, i) => {
        section.track_number = i + 1;
    });
    return data;
}

function render(source, data, fn) {
    dust.render(source, data, (error, html) => {
        if (!error) fn(html);
        else console.error(error);
    });
}

function toggleEvents(tracklistContainer, toggleContainer) {
    const button = toggleContainer.querySelector('.tracklist-toggle-text');
    const tracklist = tracklistContainer.querySelector('.cloudcast-tracklist');
    button.addEventListener('click', event => {
        const hide = button.querySelector('[ng-show="tracklistShown"]');
        const show = button.querySelector('[ng-show="!tracklistShown"]');
        hide.classList.toggle('ng-hide');
        show.classList.toggle('ng-hide');
        button.classList.toggle('btn-toggled');
        tracklist.classList.toggle('ng-hide');
    });
}
