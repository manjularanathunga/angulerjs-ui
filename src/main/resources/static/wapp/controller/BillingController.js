app.controller('BillingController', function($scope,$rootScope, $http, $location, $window, AuthenticationService, Pop) {
    $rootScope.pageTitle = "Billing";
    var loggedUser = '-';
    if($rootScope.globals && $rootScope.globals.currentUser){
        loggedUser = $rootScope.globals.currentUser.username;
    }
    $scope.patient = {};
    $scope.medicalTest = {};
    $scope.patient.dateCreated = new Date();
    $scope.patientMediTestList=[];
    $scope.mediTestList=[];
    $scope.itemDisabled = false;
    $scope.testTypeList =[];
    $scope.medicalTest.mtnumber ='-';
    $scope.ptestList =[];
    $scope.c ={};



    var onload =function () {
        $scope.testTypeList.push({key: "P-NMU Clinic", value: 'P'});
        $scope.testTypeList.push({key: "S-PVT", value: 'S'});
        $scope.testTypeList.push({key: "H-HOSPITAL", value: 'H'});
        loadMedicalTestList();
        loadPatientMediTestList();
        loadPatientList();

    };


    $scope.findByPatientId = function () {
        var res = $http.get("patient/findByPatientId?id=" + $scope.patient.patientId).
        then(function(response) {
            $scope.patient = response.data.response;
            $scope.patient.dateOfBirth = new Date(response.data.response.dateOfBirth)
        }, function(response) {
            //Pop.msgWithButton('UPDATE','Fail User '+ item.fistName + ' Saving', 'error');
        });
    }

    $scope.findByNicNumber = function () {
        var res = $http.get("patient/findByNicNumber?id=" + $scope.patient.nicNumber).
        then(function(response) {
            $scope.patient = response.data.response;
            $scope.patient.dateOfBirth = new Date(response.data.response.dateOfBirth)
        }, function(response) {
            //Pop.msgWithButton('UPDATE','Fail User '+ item.fistName + ' Saving', 'error');
        });
    }



    $scope.showUI = function (itm, opType) {
        $scope.actionType = opType;
        if('add' === $scope.actionType){
/*            $scope.heading='Add Patient Details';
            $scope.itemDisabled=false;
            $scope.patient={};
            $scope.patient.status = 'ACTIVE';*/
        }else if('edit' === $scope.actionType){
/*            $scope.heading='Edit Patient Details';
            $scope.itemDisabled=false;
            $scope.patient=itm;
            $scope.patient.dateOfBirth=new Date(itm.dateOfBirth);*/
        }else if('delete' === $scope.actionType){
/*            $scope.heading='Delete Patient Details';
            $scope.itemDisabled=true;
            $scope.patient=itm;*/
            var res = $http.delete("patientmedicaltest/delete?id=" + itm.id);
            loadPatientMediTestList();
        }
    };


    $scope.addSelectedTest = function () {
        var b = $scope.patient;
        console.log('selected test > ' + JSON.stringify($scope.medicalTest));
        $scope.medicalTest.mtnumber = new Date().getFullYear()+''+$scope.medicalTest.type +'00001';
        $scope.medicalTest.lastDateModified = new Date();
        $scope.medicalTest.dateCreated = new Date();
        $scope.medicalTest.actionBy = loggedUser;

        if(!b.patientId){
            Pop.msgWithButton('ADD MEDICAL TEST','Patient not selected', 'error');
            return;
        }

        if(!$scope.medicalTest.type){
            Pop.msgWithButton('ADD MEDICAL TEST','Test type not selected', 'error');
            return;
        }

        if(!$scope.medicalTest.name){
            Pop.msgWithButton('ADD MEDICAL TEST','Test name not selected', 'error');
            return;
        }

        if(!$scope.medicalTest.price){
            Pop.msgWithButton('ADD MEDICAL TEST','Test price not selected', 'error');
            return;
        }

        $http.post('/patientmedicaltest/save', $scope.medicalTest).
        then(function(response) {
            Pop.timeMsg('success','MEDICAL TEST ADDED ', '<<'+$scope.medicalTest.mtnumber +'>> has been added to patient <<'+b.patientId +'>>',3000);
            $scope.medicalTest = {};
            $scope.mtest = {};
            loadPatientMediTestList($scope.patient.nicNumber,$scope.patient.type);
        }, function(response) {
            //Pop.msgWithButton('UPDATE','Fail User '+ item.fistName + ' Saving', 'error');
        });
    };

    $scope.onSelectMedicalTest = function () {
        if($scope.mtest){
            var item = JSON.parse($scope.mtest);
            $scope.medicalTest.type  = $scope.mtype;
            $scope.medicalTest.name  = item.name;
            $scope.medicalTest.price = item.price;
        }
    };

    var loadPatientList = function () {
        $http.get("patient/getList").then(function (response) {
            $scope.ptestList = response.data;
        });
    };

    var loadMedicalTestList = function () {
        $http.get("medicaltest/getList").then(function (response) {
            $scope.mediTestList = response.data;
        });
    };

    $scope.onSelectTestType = function () {
        if($scope.patient){
            loadPatientMediTestList($scope.patient.nicNumber,$scope.patient.type);
        }else{
            $scope.mediTestList = [];
        }
    }


    var loadPatientMediTestList = function () {
        var res = $http.get("patientmedicaltest/findAllByPatientIdAndType?id=" + $scope.patient.nicNumber+"&type="+$scope.patient.type).
        then(function(response) {
            $scope.mediTestList = response.data.response;
        }, function(response) {

        });

    };

    onload();
});
