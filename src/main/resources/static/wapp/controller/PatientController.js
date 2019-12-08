app.controller('PatientController', function($scope,$rootScope, $http, $location, $window) {
    $rootScope.pageTitle = "Patient";

    $scope.patientList=[];
    $scope.patient={};

    var loggedUser = '-';
    if($rootScope.globals && $rootScope.globals.currentUser){
        loggedUser = $rootScope.globals.currentUser.username;
    }

    $scope.showUI = function (itm, opType) {
        $("#modal-inv").modal("show");
    };

    $scope.save_submit = function () {
        $http.post('/users/save', $scope.patient).
        then(function(response) {
            loadList();
            //reset_screen();
            //Pop.msgWithButton('New User <<'+ item.fistName + '>> Created','New user <<'+ item.userId + '>>has been created, Auto generated password for the first login user : <<'+item.userId+'>> is : <<' + item.passWord +'>>', 'success');
        }, function(response) {
            //Pop.msgWithButton('UPDATE','Fail User '+ item.fistName + ' Saving', 'error');
        });
    };


    var loadList = function () {
        $http.get("patient/getList").then(function (response) {
            $scope.patientList = response.data;
        });
    };
    loadList();
});
