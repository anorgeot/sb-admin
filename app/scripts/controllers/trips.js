/**
 * Created by Arnaud.Norgeot on 07/06/2016.
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
'use strict';
angular.module('sbAdminApp')
    .controller('TripsCtrl', ['$scope', '$http', 'CONFIG', 'i18nService','diacriticsRemove', function($scope, $http, CONFIG, i18nService, diacriticsRemove) {

        
        /*--------------------------PARTIE DATEPICKER-----------------------------------------*/



        //Requête afin de récupérer le date du premier trajet de l'utilisateur
        $http({
            method: 'GET',
            url: CONFIG.baseUrl+'...'
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
            $scope.fromDateOptions.minDate = new Date(tripDate);
            $scope.toDateOptions.minDate = new Date(tripDate);

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
        //Affichage par default de la date du jour dans l'input de la date limite d'affichage
        var fromDate = new Date(),
            toDate = new Date();
        $scope.fromDateString=fromDate.setMonth(fromDate.getMonth() - 1);
        $scope.toDateString = toDate;
        var startdate = new Date(fromDate),
            enddate=toDate;

        update(startdate, enddate);

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
            var startdate=$scope.fromDateString,
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



        /*---------------------------------------PARTIE TABLEAU-----------------------------------------*/



        $scope.columns = [
            { field: 'userId', displayName: 'Utilisateur', minWidth: 114, type: 'number' },
            { field: 'tripDate', displayName: 'Date', minWidth: 90, type: 'date' },
            { field: 'carType', displayName: 'Type véhicule', minWidth: 138 },
            { field: 'distance', displayName: 'Distance (km)', minWidth: 137, type: 'number' },
            { field: 'consumption', displayName: 'Consommation (L)', minWidth: 170, type: 'number' },
            { field: 'duration', displayName: 'Durée (min)', minWidth: 123, type: 'number' },
            { field: 'avgConsumption', displayName: 'Conso moyenne (L/100km)', minWidth: 226, type: 'number' },
            { field: 'emission', displayName: 'CO2 émis (kg)', minWidth: 139, type: 'number' },
            { field: 'note', displayName: 'Note efficacité *', minWidth: 157, type: 'number' }
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
            console.info("Filter button has been clicked");
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
                [ 'carType', 'userId' ].forEach(function( field ){
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

        $scope.$watch(
            function() {
                return $('.ui-grid-sort-priority-number').text() === '1';
            },
            function(single) {
                var priority = $('.ui-grid-sort-priority-number');
                single ? priority.hide() : priority.show();
            }
        );

        function update(startdate, enddate) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + '...',
                params: {
                    param1: ...,
                    startDate: startdate.getFullYear() + "-" + (startdate.getMonth() + 1) + "-" + startdate.getDate(),
                    endDate: enddate.getFullYear() + "-" + (enddate.getMonth() + 1) + "-" + enddate.getDate()
                }
            }).then(function(response){
                for (var i=0; i<response.data.data.length; i++) {
                    if(response.data.data[i].distance==0){
                        response.data.data[i].distance=0.1;
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
        }
    }]);
