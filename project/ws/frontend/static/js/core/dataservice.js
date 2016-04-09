(function() {
    'use strict';

    angular
        .module('abcss.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', 'exception', 'storageservice', '$state', 'logger', '$auth'];
    function dataservice($http, exception, storageservice, $state, logger, $auth) {

        var service = {
            authenticate: authenticate,
            getHomePage: getHomePage,

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
                $state.go('dashboard.home');
            }
        }

        function getHomePage() {
            return $http.get('/api/home', {
                ignoreLoadingBar: true
            })
                .then(complete)
                .catch(function(message) {
                    exception.catcher(message.data.message || 'Error')(angular.toJson(message, true));
                });
            function complete(result) {
                return result.data
            }
        }
    }
})();
