app.controller('PatientController', function($scope,$rootScope, $http, $location, $window) {
    $rootScope.pageTitle = "Patient";

    $scope.patientList=[];
    $scope.patient={};
    $scope.heading='Edit Patient Details';
    $scope.itemDisabled=false;
    $scope.actionType='';
    $scope.genderLst=['MALE','FEMALE'];

    var loggedUser = '-';
    if($rootScope.globals && $rootScope.globals.currentUser){
        loggedUser = $rootScope.globals.currentUser.username;
    }

    $scope.showUI = function (itm, opType) {
        $scope.actionType = opType;
        if('add' === $scope.actionType){
            $scope.heading='Add Patient Details';
            $scope.itemDisabled=false;
            $scope.patient={};
        }else if('edit' === $scope.actionType){
            $scope.heading='Edit Patient Details';
            $scope.itemDisabled=false;
            $scope.patient=itm;
            $scope.patient.dateOfBirth=new Date(itm.dateOfBirth);
        }else if('delete' === $scope.actionType){
            $scope.heading='Delete Patient Details';
            $scope.itemDisabled=true;
            $scope.patient=itm;
        }
        $("#modal-inv").modal("show");
    };

    $scope.saveModal = function () {
        $scope.patient.lastModified =new Date();
        $scope.patient.actionBy=loggedUser;

        if('add' === $scope.actionType){
            $scope.patient.dateCreated =new Date();
        }else if('edit' === $scope.actionType){
            $scope.patient.status = 'ACTIVE';

        }else if('delete' === $scope.actionType){
            $scope.patient.status = 'DELETED';
        }

        $http.post('/patient/save', $scope.patient).
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
