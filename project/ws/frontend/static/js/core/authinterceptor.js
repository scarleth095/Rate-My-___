(function() {
    'use strict';

    angular
        .module('abcss.core')
        .service('authinterceptor', authinterceptor);

        authinterceptor.$request = ['$injector'];
        function authinterceptor($injector){
            // modules to inject
            var $q;
            var storageservice;
            var $state;
            var authservice;

            var service = this;

            service.request = serviceRequest;
            service.responseError = serviceResponseError;

            function serviceRequest (config) {
                // inject modules to avoid circular dependency
                storageservice = $injector.get('storageservice');
                var url = config.url;
                var api = "/api/";
                if (url.lastIndexOf(api, 0) === 0) {
                    var token = storageservice.getToken();
                    var uid = storageservice.getUID();
                    config.headers = config.headers || {};
                    if (token !== null && token !== undefined) {
                        config.headers.Authorization = token;
                    }
                    if (uid !== null && uid !== undefined) {
                        config.headers.UID = uid;
                    }
                }

                return config;
            }

            function serviceResponseError (response) {

                // inject modules to avoid circular dependency
                storageservice = $injector.get('storageservice');
                $state = $injector.get('$state');
                $q = $injector.get('$q');
                authservice = $injector.get('authservice')
                var url = response.config.url;
                var api = "/api/";
                if (url.lastIndexOf(api, 0) === 0) {
                    var response_code = response.data.code || null;
                    if (response_code === -1 || response_code === -3) {
                        storageservice.clearUID();
                        storageservice.clearName();
                        storageservice.clearToken();
                        storageservice.clearProfilePicture();
                        $state.go('login');
                    }
                    else if(authservice.isAuthenticated()) {
                        $state.go('dashboard.404');
                    }
                }

                return $q.reject(response);
            }
        }
})();
