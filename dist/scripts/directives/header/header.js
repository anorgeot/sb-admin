"use strict";angular.module("sbAdminApp").directive("header",["CONFIG",function(CONFIG){return{templateUrl:"scripts/directives/header/header.html?v="+CONFIG.version,restrict:"E",replace:!0}}]);