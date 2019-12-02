app.controller('LoginController', function($scope, $rootScope, $http, $location, $window, AuthenticationService, UserService) {
    $rootScope.pageTitle = "Login";
    $scope.dataLoading = false;
    $scope.auser = {};
    $scope.dataLoading = true;


    AuthenticationService.ClearCredentials();

    $scope.loginToSystem = function() {
        // Pop.showMsg('success','sdsdsd');
        //UserService.GetAll();
        //AuthenticationService.SetCredentials('', '');
        AuthenticationService.Login($scope.auser.username, $scope.auser.password, function (response) {
            if (response.success) {
                AuthenticationService.SetCredentials($scope.auser.username, $scope.auser.password);
                $location.path('/');
            } else {
                FlashService.Error(response.message);
                $scope.dataLoading = false;
            }
        });
    }

    var validateField = function(fieldToValidate, errmessage){
        // AuthenticationService.Login();
    }
});
