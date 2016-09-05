'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('headerNotification',['CONFIG',function(CONFIG){
		return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html?v='+CONFIG.version,
        restrict: 'E',
        replace: true,
    	}
	}]);


