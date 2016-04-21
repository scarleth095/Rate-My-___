(function() {
    'use strict';

    angular.module('abcss.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngSanitize',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router',
        /*
         * 3rd Party modules
         */
        'ngplus', 'ui.bootstrap', 'ngStorage', 'ngTagsInput', 'oi.select', 'angular-loading-bar', 'satellizer', 'ngImgur'
    ]);
})();
