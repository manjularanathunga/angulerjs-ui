app.controller('PatientTestController', function($scope, $rootScope, $http, $location, $window, AuthenticationService, Pop) {
    $rootScope.pageTitle = "Patient Test Page";
    var loggedUser = '-';
    if ($rootScope.globals && $rootScope.globals.currentUser) {
        loggedUser = $rootScope.globals.currentUser.username;
    }

    $scope.patientMediTestList = [];
    $scope.uicompo = {};
    $scope.uicompo.billingNumber = "19P0001";
    $scope.uicompo.patientId = "000001";

    $scope.loadByBillingNum = function() {
    var res = $http.get("patientmedicaltest/findAllActiveByBillingNumber?billingNumber=" + $scope.uicompo.billingNumber)
        .then(function(response) {
            if (response.data.success) {
                $scope.patientMediTestList = response.data.response;
            } else {
                $scope.patientMediTestList = [];
            }
        }, function(response) {

        });
    }

    $scope.loadByPatientId = function() {
        var res = $http.get("patientmedicaltest/findAllByBillingNumber?billingNumber=" + $scope.uicompo.billingNumber)
            .then(function(response) {
                if (response.data.success) {
                    $scope.patientMediTestList = response.data.response;
                } else {
                    $scope.patientMediTestList = [];
                }
            }, function(response) {

            });
    }
});

