"use strict";angular.module("sbAdminApp").directive("sidebar",["CONFIG",function(CONFIG){return{templateUrl:"scripts/directives/sidebar/sidebar.html?v="+CONFIG.version,restrict:"E",replace:!0,controller:function($scope){$scope.selectedMenu="dashboard",$scope.collapseVar=0,$scope.multiCollapseVar=0,$scope.check=function(x){x==$scope.collapseVar?$scope.collapseVar=0:$scope.collapseVar=x},$scope.multiCheck=function(y){y==$scope.multiCollapseVar?$scope.multiCollapseVar=0:$scope.multiCollapseVar=y}}}}]);