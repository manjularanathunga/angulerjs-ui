var app = angular.module('app',['ngRoute', 'ngCookies'])
    .run(['$rootScope','$location','$window','$http', '$cookies', function($rootScope, $location, $window, $http, $cookies){


        $rootScope.currentUserId= $window.localStorage.getItem('mdbUserId') || false;
        $rootScope.mdbRole= $window.localStorage.getItem('mdbRole') || false;
        $rootScope.authdata= $window.localStorage.getItem('mdbAuthData') || false;
        $rootScope.mdbloggedUser = $window.localStorage.getItem('mdbloggedUser');

        $rootScope.presentDate = new Date();
        $rootScope.mainTitle = "Medical Data Analysis System";
        $rootScope.loggedUser = $rootScope.mdbloggedUser;
        $rootScope.pageTitle = "Login";

        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                // $location.path('/login');
            }
        });


    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl : 'wapp/view/loginPage.html',
                controller: 'LoginController'
            })
            .when("/dashboard", {
                templateUrl : 'wapp/view/dashboardPage.html',
                controller: 'DashboardController'
            })
            .when("/useradmin", {
                templateUrl : 'wapp/view/userAdminPage.html',
                controller: 'UserAdminController'
            })
            .when("/patient", {
                templateUrl : 'wapp/view/patientPage.html',
                controller: 'PatientController'
            })
            .when("/logout", {
                templateUrl : 'wapp/view/logoutPage.html',
                controller: 'LogoutController'
            })

    }]);
