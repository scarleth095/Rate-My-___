(function() {

    angular
        .module('abcss.login')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
    function getStates() {
        return {
                name: 'login',
                templateUrl: '/templates/login.html',
                url: '/login',
                controller: 'LoginController',
                controllerAs: 'vm'
            };

    }

})();