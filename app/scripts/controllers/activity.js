/**
 * Created by Arnaud.Norgeot on 13/05/2016.
 */
'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:ActivityCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('ActivityCtrl', ['$scope', '$http', 'CONFIG', 'i18nService','diacriticsRemove', function($scope, $http, CONFIG, i18nService, diacriticsRemove) {



        /*--------------------------PARTIE DATEPICKER-----------------------------------------*/



        //Requête afin de récupérer le date du premier trajet de l'utilisateur
        $http({
            method: 'GET',
            url: CONFIG.baseUrl+'.....'
        }).then(function(response){
            $scope.firstTripData = response.data.data;

            /**///-> Méthode "Afficher Date Premier Trajet" compatible IE, FF, Chr<-//
            /**/
            /**/          //decoupage de la date
            /**/          var year = [$scope.firstTripData.result.slice(0, 4)],
            /**/          month = [$scope.firstTripData.result.slice(5, 7)],
            /**/          day = [$scope.firstTripData.result.slice(8, 10)],
            /**/
            /**/          months = [
            /**/            "January",
            /**/            "February",
            /**/            "March",
            /**/            "April",
            /**/            "May",
            /**/            "June",
            /**/            "July",
            /**/            "August",
            /**/            "September",
            /**/            "October",
            /**/            "November",
            /**/            "December"];
            /**/         //Si date du jour commence par un 0, jour = deuxième chiffre
            /**/         if(($scope.firstTripData.result.slice(5, 6))==0){
            /**/
            /**/              month = [$scope.firstTripData.result.slice(6, 7)];
            /**/         }
            /**/            //Mise en forme de la date pr la rendre compatible avec la fonction Date.parse
            /**/          var tripDate = months[month-1]+" "+day+", "+year;
            /**///->
            $scope.fromDateString = new Date(tripDate);
            $scope.fromDateOptions.minDate = new Date(tripDate);
            $scope.toDateOptions.minDate = new Date(tripDate);
            //Affichage par default de la date du jour dans l'input de la date limite d'affichage
            var startdate = new Date(tripDate),
                enddate=$scope.toDateString = new Date();

            update(startdate, enddate);

        }, function(response){
            if ( !angular.isObject( response.data ) || !response.data.text ) {
                $scope.firstTripDataError = "An unknown error occurred.";
            } else {
                $scope.firstTripDataError = response.data.text;
            }
        });
        //Fonction permettant d'afficher la date du jour.
        $scope.today = function() {
            $scope.fromDateString = new Date();
            $scope.toDateString = new Date();
        };

        //Fonction qui vide l'input correspondant
        $scope.clear = function() {
            $scope.fromDateString = null;
            $scope.toDateString = null;
        };
        //Parametre du calendrier "début"
        $scope.fromDateOptions = {
            showWeeks: true,
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(),
            today: new Date(),
            startingDay: 1
        };
        //Parametre du calendrier "fin"
        $scope.toDateOptions = {
            showWeeks: true,
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(),
            startingDay: 1
        };
        //Fonction affichage calendrier "début"
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        //Fonction affichage calendrier "fin"
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        //Fonction cacher calendrier "début" par default
        $scope.popup1 = {
            opened: false
        };
        //Fonction cacher calendrier "fin" par default
        $scope.popup2 = {
            opened: false
        };

        //Fonction qui regle la date selectionnable qd input "début" change
        $scope.fromDateChanged = function(){
            $scope.toDateOptions.minDate = $scope.fromDateString;
            if($scope.fromDateString>$scope.toDateString){

                $scope.toDateString = new Date();
            }
            var startdate=$scope.fromDateStringe
                enddate=$scope.toDateString;

            update(startdate, enddate);

        };

        // update(startdate, enddate);

        //Fonction qui regle la date selectionnable qd input "fin" change
        $scope.toDateChanged = function(){
            $scope.fromDateOptions.maxDate = new Date();
            var startdate=$scope.fromDateString,
                enddate=$scope.toDateString;

            update(startdate, enddate);
        };

        var startdate=$scope.fromDateString,
            enddate=$scope.toDateString;

            //Lorsque La date de début séléctionnée change...
            $scope.$watch('startdate', function(newValue, oldValue) {
                if (newValue === oldValue) { return; }
                //les données des vignettes sont mises à jour
                onlineData.update($scope.fromDateString, $scope.toDateString, function(response) {
                    var i,
                        nbInactif = 0,
                        nbUsers = response.data.data.length;
                    for (i = 0; i < nbUsers; i++) {
                        if (response.data.data[i].active == false) {
                            $scope.tableOptions.data[i] = {
                                first_name: response.data.data[i].first_name,
                                family_name: response.data.data[i].family_name
                            };

                            nbInactif += 1;
                        }
                    }
                    $scope.percentActive = Math.round(100 * (nbInactif / nbUsers));
                });
            }, true);
            //Lorsque La date de fin séléctionnée change...
            $scope.$watch('enddate', function(newValue, oldValue) {
                if (newValue === oldValue) { return; }
                //les données des vignettes sont mises à jour
                onlineData.update($scope.fromDateString, $scope.toDateString, function(response) {
                    var i,
                        nbInactif = 0,
                        nbUsers = response.data.data.length;
                    for (i = 0; i < nbUsers; i++) {
                        if (response.data.data[i].active == false) {
                            $scope.tableOptions.data[i] = {
                                first_name: response.data.data[i].first_name,
                                family_name: response.data.data[i].family_name
                            };

                            nbInactif += 1;
                        }
                    }
                    $scope.percentActive = Math.round(100 * (nbInactif / nbUsers));
                });
            }, true);



        /*---------------------------------------PARTIE TABLEAU-----------------------------------------*/



        $scope.columns = [
            { field: 'first_name', displayName: 'Prenom', minWidth: 114 },
            { field: 'family_name', displayName: 'Nom', minWidth: 90 }
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
                [ 'first_name','family_name' ].forEach(function( field ){
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

        function update(startdate, enddate) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + '...',
                params: {
                    param1: ...,
                    param2: "...",
                    startDate: startdate.getFullYear() + "-" + (startdate.getMonth() + 1) + "-" + startdate.getDate(),
                    endDate: enddate.getFullYear() + "-" + (enddate.getMonth() + 1) + "-" + enddate.getDate()
                }
            }).then(function (response) {
                $scope.tableError = false;
                var i,
                    nbInactif = 0,
                    nbUsers = response.data.data.length;
                for (i = 0; i < nbUsers; i++) {
                    if (response.data.data[i].active == false) {
                        $scope.tableOptions.data[i] = {
                            first_name: response.data.data[i].first_name,
                            family_name: response.data.data[i].family_name
                        };

                        nbInactif +=1;
                    }
                }
                $scope.percentActive = Math.round(100 * ((nbUsers-nbInactif) / nbUsers));
                $scope.tableOptions.data.length  == 0 ? $scope.dataLoading = true : $scope.dataLoading = $scope.tableOptions.data;
                $scope.tableOptions.data.length == 0 ? $scope.noData = true : $scope.noData = false;

            }, function (response) {
                if (!angular.isObject(response.data) || !response.data.text) {
                    $scope.tableError = "An unknown error occurred.";
                } else {
                    $scope.tableError = response.data.text;
                }
            })
        }
    }]);