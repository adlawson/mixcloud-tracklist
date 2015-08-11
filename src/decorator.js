/* globals angular, module */

module.exports = function () {
    //Intercept Mixloud's comunication with their servers by wrapping their
    //async HTTP request angular service. Commented log's are there for debugging
    //in case Mixcloud changes their code.
    angular.module("mixcloudShared").config(["$provide", function ($provide) {
        $provide.decorator("mHttp", ["$delegate", function ($delegate) {

            function decoratedMHttp (params) {
                //if (arguments.length > 1) {
                //    console.warn("argument count for mHttp factory execeeded");
                //}
                //console.log("mHttp called with argument:", params);


                return $delegate(params).then(function (result) {
                    //console.log("promise for url \"" + params.url + "\" resolved with", result);

                    if (typeof result === "object" && result.should_hide_tracklist !== void(0)) {
                        //console.log("found player/details request");
                        //if (result.should_hide_tracklist) {
                        //    console.log("tracklist was hidden - fixed");
                        //} else {
                        //    console.log("tracklist already was displayed");
                        //}
                        result.should_hide_tracklist = false;
                    }

                    return result;
                });
            }
            decoratedMHttp.isInProgress = $delegate.isInProgress;
            decoratedMHttp.cancel = $delegate.cancel;

            //cannot directly delegate the following 3 (4) functions, as
            //the original implementations calls via the local variable reference
            //to the main function
            decoratedMHttp.get = function(e, t) {
                return decoratedMHttp(angular.extend({method: "GET", url: e}, t));
            };
            decoratedMHttp.post = function(e, t) {
                return decoratedMHttp(angular.extend({method: "POST", url: e}, t));
            };
            decoratedMHttp.del = function(e, t) {
                return decoratedMHttp(angular.extend({method: "DELETE", url: e}, t));
            };

            //directly delegated (i.e. no decorating for these calls) for now
            //since origin of 'e' function is unresolved
            decoratedMHttp.load = $delegate.load;
            //Original 'load' function from Mixcloud sources for reference
            /*p.load = function(t, n, r, o) {
                return p(angular.extend({method: "GET",url: r,element: t,onSuccess: function(r) {
                    t.html(r), e(t.contents())(n)
                }}, o))
            };*/

            return decoratedMHttp;
        }]);
    }]);
};
