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

            var service = this;

            service.request = serviceRequest;
            service.responseError = serviceResponseError;

            function serviceRequest (config) {

                // inject modules to avoid circular dependency
                storageservice = $injector.get('storageservice');


                var token = storageservice.getToken();
                var uid = storageservice.getUID();
                config.headers = config.headers || {};
                if (token !== null || token !== undefined) {
                    config.headers.Authorization = token;
                }

                if (uid !== null || uid !== undefined) {
                    config.headers.UID = uid;
                }

                return config;
            }

            function serviceResponseError (response) {

                // inject modules to avoid circular dependency
                storageservice = $injector.get('storageservice');
                $state = $injector.get('$state');
                $q = $injector.get('$q');
                var response_code = response.data.code || null;

                if (response_code === -4 || response_code === -5) {
                    storageservice.clearUID();
                    storageservice.clearName();
                    storageservice.clearToken();
                    storageservice.clearProfilePicture();
                    $state.go('login');
                }
                //else if (response.status != 200){}

                return $q.reject(response);
            }
        }
})();
