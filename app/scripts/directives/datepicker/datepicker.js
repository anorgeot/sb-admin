/**
 * Created by wenow on 19/05/2016.
 */
'use strict';

angular.module('sbAdminApp')
    .directive('datepicker', ['$scope', '$http', 'CONFIG', function($scope, $http, CONFIG){
        
    //Requête afin de récupérer le date du premier trajet de l'utilisateur
    $http({
        method: 'GET',
        url: CONFIG.baseUrl+'/api/dashboard/getdata?module_id=7&task=date'
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
        var startdate = new Date(tripDate),
            enddate=$scope.toDateString;
    
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
    //Affichage par default de la date du jour dans l'input de la date limite d'affichage
    $scope.toDateString = new Date();
    
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
        
}]);