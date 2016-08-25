/* jslint node: true */
/* globals define, window, angular */
'use strict';

var ps = require('../main');

if (typeof define === 'function' && define.amd) {
  // AMD
  define(ps);
} else {
  // Add to a global object.
  window.PerfectScrollbar = ps;
  if (typeof window.Ps === 'undefined') {
    window.Ps = ps;
  }
}

(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    if (typeof angular === 'undefined') {
      factory(require('angular'));
    } else {
      factory(angular);
    }
    module.exports = 'ngDialog';
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['angular'], factory);
  } else {
    // Global Variables
    factory(root.angular);
  }
}(this, function (angular) {
  angular.module("perfectScrollbar")
    .directive('perfectScroll', ['$interval', '$rootScope', function ($interval, $rootScope) {
      return {
        scope: {
          suppressScrollY: "@",
          suppressScrollX: "@",
          useBothWheelAxes: "@",
          psProblematic: "@"
        },
        link: function (scope, elem) {
          window.Ps.initialize(elem[0], {
            suppressScrollY: angular.isDefined(scope.suppressScrollY) ? scope.suppressScrollY : false,
            suppressScrollX: angular.isDefined(scope.suppressScrollX) ? scope.suppressScrollX : false,
            useBothWheelAxes: angular.isDefined(scope.useBothWheelAxes) ? scope.useBothWheelAxes : false
          });
          if(scope.psProblematic === "true") {
            window.Ps.update(elem[0]);
            $interval(function () {
              window.Ps.update(elem[0]);
            }, 5000);
          }
          $rootScope.scrollBody = elem;
        }
      };
    }]);
}));
