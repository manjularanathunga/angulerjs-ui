app.controller('BillingController', function($scope,$rootScope, $http, $location, $window, AuthenticationService) {
    $rootScope.pageTitle = "Billing";
    $scope.billing = {};
    $scope.billing.dateCreated = new Date();
    $scope.ptestList=[];
    $scope.itemDisabled = false;

    var onload =function () {
        $scope.ptestList.push({testno: "19P00001", testName: 'ECG-FREE', price: "100.00"});
        $scope.ptestList.push({testno: "19P00002", testName: 'ECG-FREE', price: "200.00"});
        $scope.ptestList.push({testno: "19P00003", testName: 'ECG-FREE', price: "250.00"});
        $scope.ptestList.push({testno: "19H00001", testName: 'ECG-FREE', price: "0.00"});
        $scope.ptestList.push({testno: "19H00002", testName: 'ECG-FREE', price: "0.00"});
        $scope.ptestList.push({testno: "19S00001", testName: 'ECG-FREE', price: "50.00"});
        $scope.ptestList.push({testno: "19P00004", testName: 'ECG-FREE', price: "500.00"});
    }

    onload();
});
