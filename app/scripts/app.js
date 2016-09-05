'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
    .module('sbAdminApp', [
        'ngTouch',
        'ngCookies',
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ui.grid'
    ])
    .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','$httpProvider','CONFIG',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$httpProvider,CONFIG) {

        $ocLazyLoadProvider.config({
            debug:false,
            events:true,
        });

        $urlRouterProvider.otherwise('/login');

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        $stateProvider
            .state('dashboard', {
                url:'/dashboard',
                templateUrl: 'views/dashboard/main.html?v='+CONFIG.version,
                resolve: {
                    loadMyDirectives:function($ocLazyLoad){
                        return $ocLazyLoad.load(
                            {
                                name:'sbAdminApp',
                                files:[
                                    'scripts/directives/header/header.js',
                                    'scripts/directives/header/header-notification/header-notification.js',
                                    'scripts/directives/sidebar/sidebar.js',
                                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                                ]
                            }),
                            $ocLazyLoad.load(
                                {
                                    name:'toggle-switch',
                                    files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                        "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                    ]
                                }),
                            $ocLazyLoad.load(
                                {
                                    name:'ngAnimate',
                                    files:['bower_components/angular-animate/angular-animate.js']
                                })
                        $ocLazyLoad.load(
                            {
                                name:'ngCookies',
                                files:['bower_components/angular-cookies/angular-cookies.js']
                            })
                        $ocLazyLoad.load(
                            {
                                name:'ngResource',
                                files:['bower_components/angular-resource/angular-resource.js']
                            })
                        $ocLazyLoad.load(
                            {
                                name:'ngSanitize',
                                files:['bower_components/angular-sanitize/angular-sanitize.js']
                            })
                        $ocLazyLoad.load(
                            {
                                name:'ngTouch',
                                files:['bower_components/angular-touch/angular-touch.js']
                            })
                    }
                }
            })
            .state('dashboard.home',{
                url:'/home',
                controller: 'MainCtrl',
                templateUrl:'views/dashboard/home.html?v='+CONFIG.version,
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'sbAdminApp',
                            files:[
                                'scripts/controllers/main.js',
                                'scripts/directives/timeline/timeline.js',
                                'scripts/directives/notifications/notifications.js',
                                'scripts/directives/chat/chat.js',
                                'scripts/directives/dashboard/stats/stats.js',
                                'scripts/filters/NumberShortener.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.form',{
                templateUrl:'views/form.html?v='+CONFIG.version,
                url:'/form'
            })
            .state('dashboard.blank',{
                templateUrl:'views/pages/blank.html?v='+CONFIG.version,
                url:'/blank'
            })
            .state('login',{
                templateUrl:'views/pages/login.html?v='+CONFIG.version,
                url:'/login',
                controller:'LoginCtrl',
                resolve: {
                    loadMyFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: ['scripts/controllers/login.js']
                        })

                    }
                }
            })
            .state('dashboard.admin',{
                templateUrl:'views/admin.html?v='+CONFIG.version,
                url:'/admin',
                controller:'AdminCtrl',
                resolve: {
                    loadMyFile:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'sbAdminApp',
                            files:['scripts/directives/admin/filereader/filereader.js']
                        }),
                            $ocLazyLoad.load({
                                name:'sbAdminApp',
                                files:[
                                    'scripts/controllers/admin.js',
                                    'scripts/services/userservice.js'
                                ]
                            })
                    }
                }
            })
            .state('dashboard.trips',{
                templateUrl:'views/trips.html?v='+CONFIG.version,
                url:'/trips',
                controller:'TripsCtrl',
                resolve: {
                    loadMyFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/controllers/trips.js',
                                'scripts/services/diacriticsRemove.js'
                            ]
                        })

                    }
                }
            })
            .state('dashboard.users',{
                templateUrl:'views/users.html?v='+CONFIG.version,
                url:'/users',
                controller:'UsersCtrl',
                resolve: {
                    loadMyFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/services/diacriticsRemove.js',
                                'scripts/controllers/users.js'
                            ]
                        })

                    }
                }
            })
            .state('dashboard.activity',{
                templateUrl:'views/activity.html?v='+CONFIG.version,
                url:'/activity',
                controller:'ActivityCtrl',
                resolve: {
                    loadMyFile:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'activity.js',
                            files:[
                                'styles/circle.css',
                                'scripts/services/diacriticsRemove.js',
                                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                                'bower_components/angular-chart.js/dist/angular-chart.css'
                            ]
                        }),
                            $ocLazyLoad.load({
                                name:'sbAdminApp',
                                files:['scripts/controllers/activity.js']
                            })
                    }
                }
            })
            .state('dashboard.eco-driving',{
                url:'/eco-driving',
                controller: 'EcoCtrl',
                templateUrl:'views/eco-driving.html?v='+CONFIG.version,
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            names: 'eco-driving.js',
                            files:[
                                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                                'bower_components/angular-chart.js/dist/angular-chart.css',
                                'bower_components/morris.js/morris.min.js'
                                
                            ]
                        }),
                            $ocLazyLoad.load({
                            name:'sbAdminApp',
                            files:[
                                'scripts/controllers/eco-driving.js']
                        })
                    }
                }
            })
            .state('dashboard.panels-wells',{
                templateUrl:'views/ui-elements/panels-wells.html?v='+CONFIG.version,
                url:'/panels-wells'
            })
            .state('dashboard.buttons',{
                templateUrl:'views/ui-elements/buttons.html?v='+CONFIG.version,
                url:'/buttons'
            })
            .state('dashboard.notifications',{
                templateUrl:'views/ui-elements/notifications.html?v='+CONFIG.version,
                url:'/notifications'
            })
            .state('dashboard.typography',{
                templateUrl:'views/ui-elements/typography.html?v='+CONFIG.version,
                url:'/typography'
            })
            .state('dashboard.icons',{
                templateUrl:'views/ui-elements/icons.html?v='+CONFIG.version,
                url:'/icons'
            })
            .state('dashboard.grid',{
                templateUrl:'views/ui-elements/grid.html?v='+CONFIG.version,
                url:'/grid'
            })
    }])
    .run(['$rootScope', '$state', '$cookieStore', '$http', 'AuthenticationService', function($rootScope, $state, $cookieStore, $http, AuthenticationService) {
        // keep user logged in after page refresh
        console.info("app run");
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            console.info("user id="+$rootScope.globals.currentUser.uid);
            $http.defaults.headers.common['Userid'] = $rootScope.globals.currentUser.uid;
            $http.defaults.headers.common['Token'] = $rootScope.globals.currentUser.token;
        }

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options){
                // Debug info:
                console.info("Location change (3 next lines are state name, params and options):");
                console.info(toState.name);
                console.info(toParams);
                console.info(options);
                // Check if user is still logged in to access this view:
                if ( toState.name != "login" ) AuthenticationService.CheckCredentials();
            }
        );

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error){
                console.warn("STATE: Location change error. Next line shows info about this error.");
                console.log(error);
            });

        $rootScope.$on('$viewContentLoading',
            function(event, viewConfig){
                console.info("STATE: viewContentLoading. Two next lines are event and viewConfig.");
                console.log(event);
                console.log(viewConfig);
                // Access to all the view config properties.
                // and one special property 'targetView'
                // viewConfig.targetView
            });
    }]);