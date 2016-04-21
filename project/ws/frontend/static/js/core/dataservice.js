(function() {
    'use strict';

    angular
        .module('abcss.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', 'exception', 'storageservice', '$state', 'logger', '$auth', '$q'];
    function dataservice($http, exception, storageservice, $state, logger, $auth, $q) {

        var service = {
            authenticate: authenticate,
            getPost: getPost,
            getTags: getTags
        };

        return service;

        // not used by resolve so errors are handled differently
        function authenticate(username, password) {
                $auth.authenticate("facebook")
                .then(complete)
                .catch(function(message) {
                    exception.catcher(message.data.message || 'Login Failed')(angular.toJson(message, true));
                });

            function complete(result) {
                var data = result.data;
                storageservice.setToken(data.token);
                storageservice.setName(data.name);
                storageservice.setUID(data.uid);
                storageservice.setProfilePicture(data.profile_picture_url);
                $state.go('dashboard.home');
            }
        }

        function getPost(params) {
            return $http.get('/api/posts/post/' + params.id, {
                ignoreLoadingBar: true
            })
                .then(complete)
                .catch(function(message) {
                    $state.go('dashboard.404');
                    exception.catcher(message.data.message || 'Error')(angular.toJson(message, true));
                });

            function complete(result) {
                return result.data
            }
        }

        function getTags() {
            var tags = [
                { "text": "Tag1" },
                { "text": "Tag2" },
                { "text": "Tag3" },
                { "text": "Tag4" },
                { "text": "Tag5" },
                { "text": "Tag6" },
                { "text": "Tag7" },
                { "text": "Tag8" },
                { "text": "Tag9" },
                { "text": "Tag10" }
                ];


            var deferred = $q.defer();
            deferred.resolve(tags);
            return deferred.promise;
        }
    }
})();
