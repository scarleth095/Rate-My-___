(function() {
    'use strict';

    var core = angular.module('abcss.core');

    core.config(toastrConfig);


    function toastrConfig(){
        angular.extend(toastrConfig, {
            timeOut:4000,
            positionClass: 'toast-top-right'
        })
    }

    var config = {
        appErrorPrefix: '[Error] ', //Configure the exceptionHandler decorator
        appTitle: 'abc Security Service',
        version: '1.0.0'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', 'exceptionHandlerProvider' ];
    function configure ($logProvider, exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)
        if (!$logProvider.debugEnabled()) {
            $logProvider.debugEnabled(true);
        }
        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }

    core.config(loadingBarConfig);
    loadingBarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingBarConfig(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.latencyThreshold = .5;
        cfpLoadingBarProvider.includeSpinner = false;

    }

    core.config(authProviderConfig);
    authProviderConfig.$inject = ['$authProvider'];
    function authProviderConfig($authProvider) {
        $authProvider.facebook(
        {
        url: 'api/auth/facebook',
        clientId: '959848700776434',
        // by default, the redirect URI is http://localhost:5000
        redirectUri: location.origin + '/login'
        });
        $authProvider.httpInterceptor = false;
    }

})();
