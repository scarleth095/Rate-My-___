(function() {
    'use strict';

    angular
        .module('abcss.core')
        .directive('emptyToUndefined', emptyToUndefined);

    function emptyToUndefined () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                ctrl.$parsers.push(function (viewValue) {
                    if (viewValue === "") {
                        return undefined;
                    }
                    return viewValue;
                });
            }
        };
    }

})();
