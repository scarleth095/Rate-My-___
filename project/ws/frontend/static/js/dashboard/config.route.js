(function() {

    angular
        .module('abcss.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    getStates.$inject = ['dataservice', '$stateParams', 'storageservice'];
    function getStates(dataservice, $stateParams, storageservice) {
        return{
                name: 'dashboard',
                templateUrl: '/templates/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                children: [
                    {
                        name: 'home',
                        url: '/dashboard',
                        templateUrl: '/templates/home.html',
                        controller: 'HomeController',
                        controllerAs: 'cm',
                    }
                ]
            };
    }

})();
