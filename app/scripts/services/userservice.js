/**
 * Created by piotr.grzegorzewski on 31/03/2016.
 * Handles API customers
 */

(function () {
    'use strict';

    angular
        .module('sbAdminApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q', 'CONFIG'];
    function UserService($http, $q, CONFIG) {

       ...
       
    }

})();