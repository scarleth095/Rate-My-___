(function() {
    'use strict';

    angular
        .module('abcss.core')
        .filter('moment', momentFilter);

    momentFilter.$inject = ['tzservice', 'logger'];
    function momentFilter (tzservice, logger) {
        return function (input) {
            //uncomment to activate utc to local timezone
            var zone = tzservice.timezone;
            var momentObj = moment.utc(input, moment.ISO_8601);
            momentObj = momentObj.tz(zone);
            return momentObj.format('MMMM Do YYYY [at] h:mm a');
        };
    }

})();

