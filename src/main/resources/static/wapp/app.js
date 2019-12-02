var app = angular.module('app',['ngRoute'])
    .run(['$rootScope','$location','$window','$http', function($rootScope,$location,$window,$http){
        $rootScope.presentDate = new Date();
        $rootScope.mainTitle = "";
        $rootScope.loggedUser = "Nuwan Jayasooriya";
        $rootScope.pageTitle = "Login";

        /*        $rootScope.currentUserId    = $window.localStorage.getItem('mdbUserId') || false;
                $rootScope.mdbRole          = $window.localStorage.getItem('mdbRole') || false;
                $rootScope.authdata      = $window.localStorage.getItem('mdbAuthData') || false;
                if($rootScope.currentUserId){
                    $http.defaults.headers.common[''] = 'Basic ' + $rootScope.authdata;
                }
                $rootScope.$on('$locationChangeStart', function (event, next, current) {
                   var restrictedPage = $.inArray($location.path(),['/login']) === -1;
                   if(restrictedPage && $rootScope.currentUserId == false){
                       //$location.path('/login');
                   }
                });*/
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : 'wapp/view/patientPage.html',
                controller: 'PatientController'
            })
    }]);
