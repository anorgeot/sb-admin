'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', ['$scope', '$http', 'CONFIG',function($scope, $http, CONFIG) {

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
            $scope.fromDateString = new Date(tripDate);
            $scope.fromDateOptions.minDate = new Date(tripDate);
            $scope.toDateOptions.minDate = new Date(tripDate);
            //Affichage par default de la date du jour dans l'input de la date limite d'affichage
            $scope.toDateString = new Date();

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
      };
      //Fonction qui regle la date selectionnable qd input "fin" change
      $scope.toDateChanged = function(){
          $scope.fromDateOptions.maxDate = new Date();
      };
  }]);
