'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('stats',['onlineData', 'dynamic', 'CONFIG',function(onlineData, dynamic,CONFIG) {
        return {
            templateUrl:'scripts/directives/dashboard/stats/stats.html?v='+CONFIG.version,
            restrict:'E',
            replace:true,
            scope: {
                'comments': '@',
                'name': '@',
                'colour': '@',
                'details':'@',
                'type':'@',
                'goto':'@',
                'large':'=',
                'units':"@",
                'mid': "@",
                'task': "@",
                'startdate': "=",
                'enddate': "="
            },
            link: function($scope) {
                //Lorsque La date de début séléctionnée change...
                $scope.$watch('startdate', function(newValue, oldValue) {
                    if (newValue === oldValue) { return; }
                    //les données des vignettes sont mises à jour
                    onlineData.update($scope.startdate, $scope.enddate, $scope.mid, $scope.task, function(response) {
                        $scope.number = response.data.data.result;
                        $scope.comment2 = dynamic($scope.comments, response.data.data.dynamic);
                    }, function(response) {
                        $scope.number = "??";
                        if ( !angular.isObject( response.data ) || !response.data.text ) {
                            console.warn( "An unknown error occurred." );
                        } else {
                            // Otherwise, use expected error message.
                            console.warn( response.data.text );
                        }
                    });
                }, true);
                //Lorsque La date de fin séléctionnée change...
                $scope.$watch('enddate', function(newValue, oldValue) {
                    if (newValue === oldValue) { return; }
                    //les données des vignettes sont mises à jour
                    onlineData.update($scope.startdate, $scope.enddate, $scope.mid, $scope.task, function(response) {
                        $scope.number = response.data.data.result;
                        $scope.comment2 = dynamic($scope.comments, response.data.data.dynamic);
                    }, function(response) {
                        $scope.number = "??";
                        if ( !angular.isObject( response.data ) || !response.data.text ) {
                            console.warn( "An unknown error occurred." );
                        } else {
                            // Otherwise, use expected error message.
                            console.warn( response.data.text );
                        }
                    });
                }, true);
            },
            controller: function($scope, $window) {
                
                /*onlineData.update($scope.startdate, $scope.enddate, $scope.mid, $scope.task, function(response) {
                    $scope.number = response.data.data.result;
                    $scope.comment2 = dynamic($scope.comments, response.data.data.dynamic);

                    if( browserInfo == "11" ) { // Hack to adapt font size...
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent("resize", false, true);
                        $window.dispatchEvent(evt);
                    } else {
                        $window.dispatchEvent(new Event('resize'));
                    }
                }, function(response) {
                    $scope.number = "??";
                    if ( !angular.isObject( response.data ) || !response.data.text ) {
                        console.warn( "An unknown error occurred." );
                    } else {
                        // Otherwise, use expected error message.
                        console.warn( response.data.text );
                    }
                });*/
            }

        }
    }])

    .factory('onlineData', ['$http', 'CONFIG', function($http, CONFIG) {
        var service = {};
        service.update = update;
        return service;
        //Requettes pour toutes les vigettes sauf "Nb Personnes"
        function update(startdate, enddate, mid, task, callback, errorCallback) {
            $http({
                url: CONFIG.baseUrl+"/api/dashboard/getdata",
                method: "GET",
                cache: false,
                params: {
                    module_id: mid,
                    task: task,
                    startDate: startdate.getFullYear()+"-"+(startdate.getMonth()+1)+"-"+startdate.getDate(),
                    endDate: enddate.getFullYear()+"-"+(enddate.getMonth()+1)+"-"+enddate.getDate()

                }
            }).then( function(response) {
                callback(response);
            }, function (response) {
                errorCallback(response);
            } )
        }

    }])
    //fonction qui permet de remplacer une char par une valeur
    .factory('dynamic', function() {
        return function(template, vars) {
            for (var v in vars) {
                //console.log("Parsing variable " + v + " which value is " + vars[v]);
                template = template.replace("::" + v + "::", vars[v]);
            }
            return template;
        }

    })
    .factory('browserInfo', function() {
        // Get IE or Edge browser version
        var version = detectIE();
        return version;

        /**
         * detect IE
         * returns version of IE or false, if browser is not Internet Explorer
         */
        function detectIE() {
            var ua = window.navigator.userAgent;

            // Test values; Uncomment to check result …

            // IE 10
            // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

            // IE 11
            // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

            // Edge 12 (Spartan)
            // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

            // Edge 13
            // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                // Edge (IE 12+) => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
        }
    });
