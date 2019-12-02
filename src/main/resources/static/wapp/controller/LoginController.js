app.controller('LoginController', function($scope, $rootScope, $http, $location, $window, AuthenticationService, UserService) {
    $rootScope.pageTitle = "Login";
    $scope.dataLoading = false;

    $scope.loginToSystem = function() {
        // Pop.showMsg('success','sdsdsd');
        UserService.GetAll();
        AuthenticationService.SetCredentials('', '');
    }

    var validateField = function(fieldToValidate, errmessage){
        // AuthenticationService.Login();
    }
});
