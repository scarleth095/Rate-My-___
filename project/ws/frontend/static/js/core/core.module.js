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
        'ngplus', 'ui.bootstrap', 'ngStorage', 'chart.js', 'ngTagsInput', 'uiSwitch', 'oi.select', "checklist-model", 'angular-loading-bar', 'satellizer'
    ]);
})();
