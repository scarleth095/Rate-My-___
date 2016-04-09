(function() {
    angular
        .module('abcss')
        .run(runapp);

    runapp.$inject = ['$rootScope', 'authservice', 'exception', '$state', 'logger', "storageservice"];
    function runapp ($rootScope, authservice, exception, $state, logger, storageservice) {

            storageservice.resetHomeState();   //initialize params

            $rootScope.$on('$stateChangeStart', function (event, next) {
                //dont need to check login since its a public state and anyone can visit the page
                if (next.name !== 'login') {
                    var authorizedRoles = null;
                    // check if state is restricted
                    if (next.hasOwnProperty('data')){
                        if(next.data.hasOwnProperty('authorizedRoles')){
                            authorizedRoles = next.data.authorizedRoles;
                        }
                    }
                    if (authservice.isAuthenticated()) {
                        if (!authservice.isAuthorized(authorizedRoles)){
                            event.preventDefault();
                            exception.catcher('You do not have Authorization to view this page!')();
                        }
                    }
                    else {
                        event.preventDefault();
                        $state.go('login');
                        exception.catcher('Please Login First!')();
                    }
                }

            });
        }
})();
