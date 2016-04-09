(function() {
    'use strict';

    angular
        .module('abcss.core')
        .factory('authservice', authservice);

    authservice.$inject = ['storageservice', 'logger'];
    function authservice(storageservice, logger) {

        var service = {
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        };

        return service;

        function isAuthenticated (){
            return !!storageservice.getToken();
        }

        function isAuthorized(roles){
            var roleAuthorized = true;
            if (!!roles) {
                if (!angular.isArray(roles)) {
                    roles = [roles];
                }
                roleAuthorized = roles.indexOf(storageservice.getRole()) !== -1;
            }
            return roleAuthorized;
        }
    }
})();
