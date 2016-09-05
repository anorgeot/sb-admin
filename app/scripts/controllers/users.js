/**
 * Created by Arnaud.Norgeot on 12/05/2016.
 * @ngdoc function
 * @name sbAdminApp.controller:UsersCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
'use strict';

angular.module('sbAdminApp')
    .controller('UsersCtrl', ['$scope', '$http', 'CONFIG', 'i18nService', 'diacriticsRemove', function($scope, $http, CONFIG, i18nService, diacriticsRemove) {
        $scope.columns = [
            { field: 'first_name', displayName: 'Prenom', minWidth: 114 },
            { field: 'family_name', displayName: 'Nom', minWidth: 90 },
            { field: 'active', displayName: 'Actif *', minWidth: 137 }
            ];

        $scope.tableOptions = {
            columnDefs: $scope.columns,
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
            },
            enableFiltering: false,
            enableCellEditOnFocus: false,
            enablePaginationControls: true,
            enableSorting: true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            enableColumnResizing: true
        };
        i18nService.setCurrentLang('fr');

        $scope.filter = function() {
            $scope.gridApi.grid.refresh();
        };

        $scope.searchFunct = function(keyEvent) {
            if (keyEvent.which === 13){
                $scope.filter();
            }
        };
        $scope.singleFilter = function( renderableRows ){
            var value = $scope.filterValue ? diacriticsRemove($scope.filterValue.toLowerCase()) : "";
            var matcher = new RegExp(value);
                renderableRows.forEach( function( row ) {
                var match = false;
                [ 'first_name', 'family_name', 'active' ].forEach(function( field ){
                    var val = (row.entity[field] ? diacriticsRemove(row.entity[field].toLowerCase()) : "");
                    if ( val.match(matcher) ){
                        match = true;
                    }
                });
                if ( !match ){
                    row.visible = false;
                }
            });
            return renderableRows;
        };

        $scope.clearSearch = function () {
            $scope.filterValue=null;
            $scope.filter();
        };

        $scope.changeSearch = function () {
            $scope.filter();
        };

        $http({
            method: 'GET',
            url: CONFIG.baseUrl+'...',
            params: {
                param1: ...,
                param2: "..."
            }
        }).then(function(response){
            $scope.tableError = false;
            var i;
            for(i = 0; i < response.data.data.length; i++){
                if(response.data.data[i].active == true){
                    response.data.data[i].active = "OUI";
                }else{
                    response.data.data[i].active = "NON";
                }
            }
            $scope.tableOptions.data = response.data.data;
            response.data.data.length == 0 ? $scope.dataLoading = true : $scope.dataLoading = $scope.tableOptions.data;
            response.data.data.length == 0 ? $scope.noData = true : $scope.noData = false;
        }, function(response){
            if ( !angular.isObject( response.data ) || !response.data.text ) {
                $scope.tableError = "An unknown error occurred.";
            } else {
                $scope.tableError = response.data.text;
            }
        })
    }]);
