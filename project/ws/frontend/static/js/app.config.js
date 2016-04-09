(function(){
    angular
        .module('abcss')
        .config(config);
        config.$inject = ["$httpProvider"];
        function config($httpProvider) {
                $httpProvider.interceptors.push('authinterceptor');
            }
})();
