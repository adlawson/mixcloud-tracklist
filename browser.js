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

module.exports = {
    insert,
    insertBefore,
    onChange,
    queryElement
}

function insert(container, html) {
    container.insertAdjacentHTML('beforeend', html);
}

function insertBefore(container, sibling, html) {
    const temp = document.createElement('div');
    temp.insertAdjacentHTML('afterbegin', html);
    container.insertBefore(temp.firstChild, sibling);
}

function onChange(element, fn) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) fn();
        });
    });
    observer.observe(element, { childList: true });
}

function querySelector(query) {
    return document.querySelector(query);
}
