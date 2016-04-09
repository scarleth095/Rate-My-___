(function() {
    'use strict';

    angular
        .module('abcss.core')
        .factory('tzservice', tzservice);

    function tzservice () {
        var tz = jstz.determine().name();
        var service = {
            timezone: tz
        };
        return service;

    }

})();

