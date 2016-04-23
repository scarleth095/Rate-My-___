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
                        controllerAs: 'cm'
                    },
                    {
                        name: 'post',
                        url: '/post/:postid',
                        templateUrl: '/templates/post.html',
                        controller: 'PostController',
                        controllerAs: 'cm',
                        resolve : {
                            postdata: function(dataservice, $stateParams) {
                                return dataservice.getPost({pid: $stateParams.postid});
                            },
                            userratingdata: function(dataservice, $stateParams) {
                                return dataservice.getRating({pid: $stateParams.postid});
                            }
                        }
                    },
                    {
                        name: 'create',
                        url: '/create',
                        templateUrl: '/templates/create.html',
                        controller: 'CreateController',
                        controllerAs: 'cm'
                    },
                    {
                        name: 'profile',
                        url: '/profile',
                        templateUrl: '/templates/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'cm'
                    },
                    {
                        name: '404',
                        url: '/404',
                        templateUrl: '/templates/404.html'
                    }
                ]
            };
    }
})();
