/**
 * Created by piotr.grzegorzewski on 31/03/2016.
 * @url http://jasonwatmore.com/post/2015/03/10/AngularJS-User-Registration-and-Login-Example.aspx
 */

(function () {
    'use strict';

    angular
        .module('sbAdminApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$state', 'CONFIG'];
    function AuthenticationService($http, $cookieStore, $rootScope, $state, CONFIG) {
        
    ...
    
    }

})();