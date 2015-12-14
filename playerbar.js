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

/* globals angular, chrome, console */

(function main() {

    /**
     * As this script relies entirely on Mixcloud not updating their angular
     * setup at all, I'm wrapping it in an awful try/catch to allow the rest of
     * the page to run properly. Also due to the way Angular sets things up, we
     * have to inject when message passing is enabled rather than at either
     * "document_start", "document_end" or "document_idle" provided by the
     * extensions API.
     */
    onDocumentReady(function () {
        try {
            injectScript(playerbar, document.body.querySelector('script[type="text/x-js-state"]'));
        } catch (e) {
            console.log(e);
        }
    });

    function injectScript(content, before) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.textContent = '(' + content + ')();';
        document.body.insertBefore(script, before);
    }

    function onDocumentReady(fn) {
        chrome.extension.sendMessage({}, function (response) {
            document.addEventListener('DOMContentLoaded', fn);
        });
    }

    function playerbar() {

        /**
         * Intercept Mixloud's comunication with their servers by wrapping their
         * async HTTP request angular service.
         */
        angular.module('mixcloudShared').config(['$provide', function ($provide) {
            $provide.decorator('mHttp', function ($delegate) {
                function decoratedMHttp (params) {
                    return $delegate(params).then(function (result) {
                        if (typeof result === 'object' && result.should_hide_tracklist !== void(0)) {
                            result.should_hide_tracklist = false;
                        }
                        return result;
                    });
                }

                decoratedMHttp.isInProgress = $delegate.isInProgress;
                decoratedMHttp.cancel = $delegate.cancel;
                decoratedMHttp.load = $delegate.load;

                decoratedMHttp.get = function(e, t) {
                    return decoratedMHttp(angular.extend({method: 'GET', url: e}, t));
                };
                decoratedMHttp.post = function(e, t) {
                    return decoratedMHttp(angular.extend({method: 'POST', url: e}, t));
                };
                decoratedMHttp.del = function(e, t) {
                    return decoratedMHttp(angular.extend({method: 'DELETE', url: e}, t));
                };

                return decoratedMHttp;
            });
        }]);
    }
})();
