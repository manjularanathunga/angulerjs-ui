app.controller('LoginController', function($scope, $rootScope, $http, $location, $window, AuthenticationService) {
    $rootScope.pageTitle = "Login";
    $scope.dataLoading = false;

    $scope.loginToSystem = function() {
        // DlAlert.showMsg('','');
        // UserService.loadAllUsers();
    }

    var validateField = function(fieldToValidate, errmessage){
        // AuthenticationService.Login();
    }
});
