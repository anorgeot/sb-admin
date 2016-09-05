/**
 * Created by Arnaud.Norgeot on 25/05/2016.
 * @url http://jasonwatmore.com/post/2015/03/10/AngularJS-User-Registration-and-Login-Example.aspx
 */

(function () {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', 'AuthenticationService'];
    function LoginCtrl($scope, $state, AuthenticationService) {
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        $scope.login = function() {
            $scope.dataLoading = true;
            if (($scope.form.email.$error.required!=true)&&($scope.form.password.$error.required!=true)&&($scope.form.email.$invalid!=true)) {
                AuthenticationService.Login($scope.vm.email, $scope.vm.password, function (response) {
                    if (response && response.data && response.data.success && response.data.uid && response.data.token) {
                        AuthenticationService.SetCredentials(response.data.uid, response.data.company_id, response.data.first_name, response.data.last_name, response.data.token, response.data.group);
                        $state.go('dashboard.home');
                    } else {
                        $scope.dataLoading = false;
                        document.getElementById("error").innerHTML = "Erreur de saisie d'Email ou de Mot de passe.";
                    }
                });
            }else{

                $scope.dataLoading = false;
            }

            if (($scope.form.email.$invalid==true)&&($scope.form.email.$error.required!=true)) {
                document.getElementById("mailerror").innerHTML = " ";
                document.getElementById("error").innerHTML = "Veuillez entrer une adresse Email valide";
                document.getElementById("mail").className += " " + "has-error has-feedback";
                document.getElementById("mail").firstChild.innerHTML = "\<span class=\"glyphicon glyphicon-ok form-control-feedback\"></span>";
            }

            if (($scope.form.password.$error.required==true)&&($scope.form.email.$error.required!=true)) {
                document.getElementById("password").className += " " + "has-error has-feedback";
            }
        }
    }

})();