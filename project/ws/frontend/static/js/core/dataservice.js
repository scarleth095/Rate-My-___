(function() {
    'use strict';

    angular
        .module('abcss.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', 'exception', 'storageservice', '$state', 'logger', '$auth'];
    function dataservice($http, exception, storageservice, $state, logger, $auth) {

        var service = {
            authenticate: authenticate,
            getPost: getPost
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
    }
})();
