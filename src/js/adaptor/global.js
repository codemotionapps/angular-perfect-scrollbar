/* jslint node: true */
/* globals define, window, angular */
/* eslint no-undef: 2 */
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

angular.module("perfectScrollbar", [])
  .directive('perfectScroll', ['$interval', function ($interval) {
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
      }
    };
  }]).directive('perfectScroll', ['$interval', function ($interval) {
    return {
      link: function (scope, elem, attrs) {
        window.Ps.initialize(elem[0], {
          suppressScrollY: angular.isDefined(attrs.suppressScrollY) ? attrs.suppressScrollY : false,
          suppressScrollX: angular.isDefined(attrs.suppressScrollX) ? attrs.suppressScrollX : false,
          useBothWheelAxes: angular.isDefined(attrs.useBothWheelAxes) ? attrs.useBothWheelAxes : false
        });
        if(attrs.psProblematic === "true") {
          window.Ps.update(elem[0]);
          $interval(function () {
            window.Ps.update(elem[0]);
          }, 5000);
        }
      }
    };
  }]);
