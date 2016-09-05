/**
 * Created by Arnaud.Norgeot on 31/05/2016.
 */
'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:EcoCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('EcoCtrl', ['$scope', '$http', 'CONFIG', function($scope, $http, CONFIG) {


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

        $scope.format = "dd MMMM yyyy";

        if(window.innerWidth<=440){$scope.format = "dd.M.yyyy";}
        
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

        $scope.toDateChanged = function(){
            $scope.fromDateOptions.maxDate = new Date();
            var startdate=$scope.fromDateString,
                enddate=$scope.toDateString;

            update(startdate, enddate);
        };

        // update(startdate, enddate);

        $scope.urbanBar = Morris.Bar({
            element: 'urbainGraph',
            data: [],
            goals: [],
            goalLineColors: ["rgb(3, 255, 28)"],
            goalStrokeWidth: 2,
            barSizeRatio:0.5,
            xkey: 'x',
            ykeys: ['y'],
            ymax:10,
            labels: ['Y'],
            hideHover: 'auto',
            resize: true,
            hoverCallback: function (index, options, content, row) {
                return "" + row.x + " = " + row.y;
            },
            barColors: function (row) {
                if(row.label == "Mini") return "rgb(103, 157, 198)";
                else if(row.label == "Moy") return "rgb(57, 128, 181)";
                else if(row.label == "Maxi") return "rgb(11, 98, 164)";
            }
        });

        $scope.mixedBar=Morris.Bar({
            element: 'mixeGraph',
            data: [],
            goals: [],
            goalLineColors: ["rgb(3, 255, 28)"],
            goalStrokeWidth: 2,
            barSizeRatio:0.5,
            xkey: 'x',
            ykeys: ['y'],
            ymax:10,
            labels: ['Y'],
            hideHover: 'auto',
            resize: true,
            hoverCallback: function (index, options, content, row) {
                return "" + row.x + " = " + row.y;
            },
            barColors: function (row) {
                if(row.label == "Mini") return "rgb(103, 157, 198)";
                else if(row.label == "Moy") return "rgb(57, 128, 181)";
                else if(row.label == "Maxi") return "rgb(11, 98, 164)";
            }
        });

        $scope.extraBar=Morris.Bar({
            element: 'extraGraph',
            data: [],
            goals: [],
            goalLineColors: ["rgb(3, 255, 28)"],
            goalStrokeWidth: 2,
            barSizeRatio:0.5,
            xkey: 'x',
            ykeys: ['y'],
            ymax:10,
            labels: ['Y'],
            hideHover: 'auto',
            resize: true,
            hoverCallback: function (index, options, content, row) {
                return "" + row.x + " = " + row.y;
            },
            barColors: function (row) {
                if(row.label == "Mini") return "rgb(103, 157, 198)";
                else if(row.label == "Moy") return "rgb(57, 128, 181)";
                else if(row.label == "Maxi") return "rgb(11, 98, 164)";
            }
        });

        $scope.$watch('tableOptions', function(newValue, oldValue) {
                if (newValue === oldValue) { return; }

                if( $scope.tableOptions.urban.min === null && $scope.tableOptions.urban.avg === null && $scope.tableOptions.urban.max === null
                    && $scope.tableOptions.mixed.min === null && $scope.tableOptions.mixed.avg === null && $scope.tableOptions.mixed.max === null
                    && $scope.tableOptions.extra.min === null && $scope.tableOptions.extra.avg === null && $scope.tableOptions.extra.max === null){

                    $scope.allnoData = true;
                    $scope.noData1 = false;
                    $scope.noData2 = false;
                    $scope.noData3 = false;
                }else{


                    if($scope.tableOptions.urban.min === null && $scope.tableOptions.urban.avg === null && $scope.tableOptions.urban.max === null){
                        $scope.noData1 = true;
                    } else{
                        $scope.urbanBar.options.goals=[parseFloat($scope.tableOptions.urban.wenowAvg)];
                        $scope.urbanBar.setData([
                            {x: 'Mini', y: parseFloat($scope.tableOptions.urban.min)},
                            {x: 'Moy', y: parseFloat($scope.tableOptions.urban.avg)},
                            {x: 'Maxi', y: parseFloat($scope.tableOptions.urban.max)}
                        ]);
                    }
                    if($scope.tableOptions.mixed.min === null && $scope.tableOptions.mixed.avg === null && $scope.tableOptions.mixed.max === null){
                        $scope.noData2 = true;
                    } else{
                        $scope.mixedBar.options.goals=[parseFloat($scope.tableOptions.mixed.wenowAvg)];
                        $scope.mixedBar.setData([
                            {x: 'Mini', y: parseFloat($scope.tableOptions.mixed.min)},
                            {x: 'Moy', y: parseFloat($scope.tableOptions.mixed.avg)},
                            {x: 'Maxi', y: parseFloat($scope.tableOptions.mixed.max)}
                        ]);
                    }
                    if($scope.tableOptions.extra.min === null && $scope.tableOptions.extra.avg === null && $scope.tableOptions.extra.max === null){
                        $scope.noData3 = true;
                    } else{
                        $scope.extraBar.options.goals=[parseFloat($scope.tableOptions.extra.wenowAvg)];
                        $scope.extraBar.setData([
                            {x: 'Mini', y: parseFloat($scope.tableOptions.extra.min)},
                            {x: 'Moy', y: parseFloat($scope.tableOptions.extra.avg)},
                            {x: 'Maxi', y: parseFloat($scope.tableOptions.extra.max)}
                        ]);
                    }
                }
        }, true);

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
                    $scope.tableOptions = response.data.data;
                    // response.data.data.urban.min === null ? $scope.noData1 = true : $scope.noData1 = false;
                    // response.data.data.mixed.min === null ? $scope.noData2 = true : $scope.noData2 = false;
                    // response.data.data.extra.min === null ? $scope.noData3 = true : $scope.noData3 = false;
                    response.data.data.mixed.min === null && response.data.data.extra.min === null && response.data.data.urban.min === null ? $scope.allnoData = true : $scope.allnoData = false;
                }, function(response){
                    if ( !angular.isObject( response.data ) || !response.data.text ) {
                        $scope.tableError = "An unknown error occurred.";
                    } else {
                        $scope.tableError = response.data.text;
                        $scope.noData = true;
                    }
                })
            }


    }]);