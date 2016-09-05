'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('timeline',['CONFIG', function(CONFIG) {
    return {
        templateUrl:'scripts/directives/timeline/timeline.html?v='+CONFIG.version,
        restrict: 'E',
        replace: true,
    }
  }]);
