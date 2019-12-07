app.controller('LogoutController', function($scope,$rootScope, $http, $location, $window, AuthenticationService) {
    $rootScope.pageTitle = "Logout";

    var init = function () {
        $location.path('/login');
    }

    init();
});
