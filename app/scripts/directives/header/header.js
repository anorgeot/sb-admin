'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('header',['CONFIG',function(CONFIG){
		return {
        templateUrl:'scripts/directives/header/header.html?v='+CONFIG.version,
        restrict: 'E',
        replace: true,
    	}
	}]);


