"use strict";angular.module("sbAdminApp").directive("sidebarSearch",["CONFIG",function(CONFIG){return{templateUrl:"scripts/directives/sidebar/sidebar-search/sidebar-search.html?v="+CONFIG.version,restrict:"E",replace:!0,scope:{},controller:function($scope){$scope.selectedMenu="home"}}}]);