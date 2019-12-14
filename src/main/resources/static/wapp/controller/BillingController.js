app.controller('BillingController', function ($scope, $rootScope, $http, $location, $window, AuthenticationService, Pop) {
    $rootScope.pageTitle = "Patient Medical Test Billing";
    var loggedUser = '-';
    if ($rootScope.globals && $rootScope.globals.currentUser) {
        loggedUser = $rootScope.globals.currentUser.username;
    }

    $scope.ptestList = [];
    $scope.testTypeList = [];
    $scope.mediTestList = [];
    $scope.patientMediTestList = [];
    $scope.seenByList = [];
    $scope.districtByList = [];

    $scope.patient = {};
    $scope.patient.dateCreated = new Date();
    $scope.patient.currentAge = 0;
    $scope.showMediTest = false;
    $scope.uicompo = {};
    $scope.uicompo.selectedTest = {};
    $scope.uicompo.itemDisabled = true;



    var onload = function () {
        $scope.testTypeList.push({
            key: "P-NMU Clinic",
            value: 'P'
        });
        $scope.testTypeList.push({
            key: "S-PVT",
            value: 'S'
        });
        $scope.testTypeList.push({
            key: "H-HOSPITAL",
            value: 'H'
        });
        $scope.testTypeList.push({
            key: "H-HOSPITAL",
            value: 'W'
        });

        $scope.seenByList.push({name: "Dr.XXXX"});
        $scope.ptestList.push({"id":1,"patientId":"P0001","nicNumber":"7878787V","other":"xc","patientName":"xxxxxx","telNumber":"xcxc","dateOfBirth":"2019-12-18T16:00:00.000+0000","gender":"MALE","seenBy":"xcx","actionBy":"-","bht":null,"dateCreated":"2019-12-14T03:00:24.752+0000","lastModified":"2019-12-14T03:00:24.752+0000","status":"ACTIVE"},{"id":2,"patientId":"P0002","nicNumber":"8787878v","other":"as","patientName":"asasasas","telNumber":"as","dateOfBirth":"2019-12-17T16:00:00.000+0000","gender":"MALE","seenBy":"as","actionBy":"-","bht":null,"dateCreated":"2019-12-14T07:00:12.083+0000","lastModified":"2019-12-14T07:00:12.083+0000","status":"ACTIVE"});

        $scope.districtByList.push({name: "KANDY"});
        $scope.districtByList.push({name: "MATALE"});
        $scope.districtByList.push({name: "NUWARA-ELIYA"});


        //$scope.loadPatientList();
    };

    $scope.showUI = function (itm, opType) {
        $scope.actionType = opType;
        if ('delete' === $scope.actionType) {
            $http.delete("patientmedicaltest/delete?id=" + itm.id);
            loadPatientMediTestList();
        }
    };

    $scope.onSelectTestType = function () {
        loadMedicalTestList($scope.uicompo.selectedTestType);
        if ($scope.patient) {
            loadPatientMediTestList($scope.patient.patientId, $scope.uicompo.selectedTestType);
        } else {
            $scope.mediTestList = [];
            $scope.patientMediTestList = [];
        }
    };


    $scope.saveUpdatePatient = function () {

    };

    $scope.addSelectedTest = function () {
        var selected = $scope.uicompo.selectedTest;
        var saveTest = JSON.parse(selected);

        if (!$scope.patient) {
            Pop.msgWithButton('ADD MEDICAL TEST', 'Patient not selected', 'error');
            return;
        }

        if (!saveTest.testType) {
            Pop.msgWithButton('ADD MEDICAL TEST', 'Test type not selected', 'error');
            return;
        }

        if (!saveTest.name) {
            Pop.msgWithButton('ADD MEDICAL TEST', 'Test name not selected', 'error');
            return;
        }

        saveTest.testNumber = new Date().getFullYear() + '' + saveTest.testType + '00001';
        saveTest.patientId = $scope.patient.patientId;
        saveTest.lastDateModified = new Date();
        saveTest.dateCreated = new Date();
        saveTest.actionBy = loggedUser;
        saveTest.seenBy = $scope.patient.seenBy;
        saveTest.id=null;


        $http.post('/patientmedicaltest/save', saveTest)
        .then(function (resp) {

            Pop.timeMsg('success', 'MEDICAL TEST ADDED ', ' has been added to patient ', 2000);
            $scope.medicalTest = {};
            $scope.mtest = {};
            loadPatientMediTestList($scope.patient.patientId, $scope.uicompo.selectedTestType);
            selected = {};
            $scope.uicompo = {};

            if (resp.data.success) {
                // Pop.timeMsg('success', 'MEDICAL TEST ADDED ', '<<' + $scope.medicalTest.mtnumber + '>> has been added to patient <<' + b.patientId + '>>', 3000);

            } else {
                // Pop.timeMsg('error', 'MEDICAL TEST ADDED ', '<<' + $scope.medicalTest.mtnumber + '>> has not added to <<' + b.patientId + '>>', 3000);
                $scope.mediTestList = [];
            }
        }, function (resp) {
            Pop.msgWithButton('MEDICAL TEST ADDED', resp.data.error, 'error');
        }).catch(function (err) {
            Pop.msgWithButton('MEDICAL TEST ADDED', resp.data.error, 'error');
            //loadPatientMediTestList($scope.patient.patientId, $scope.uicompo.selectedTestType);
        });
    };


    $scope.clearCurrentPatient = function () {
        $scope.patient = {};
        $scope.medicalTest = {};
        $scope.patientMediTestList = [];
        $scope.mediTestList = [];
        $scope.showMediTest = false;
        $scope.uicompo.itemDisabled = true;
    };

    $scope. loadPatientList = function () {
        //console.log('loadPatientList');
        if($scope.patient.patientId.length > 3){
            $http.get("patient/findByPatientListById?patientId="+$scope.patient.patientId)
                .then(function (response) {
                $scope.ptestList = response.data.response;
            });
        }
    };

    $scope.findByPatientId = function () {
        $http.get("patient/findByPatientId?patientId=" + $scope.patient.patientId)
            .then(function (resp) {
            console.log('>>>>' + JSON.stringify(resp.data.response));
            $scope.patient = resp.data.response;
            $scope.patient.dateOfBirth = new Date(resp.data.response.dateOfBirth);
            $scope.showMediTest = true;
            $scope.uicompo.itemDisabled = false;
            $scope.patient.currentAge = (new Date().getFullYear() - $scope.patient.dateOfBirth.getFullYear());
        }, function (response) {
            //Pop.msgWithButton('UPDATE','Fail User '+ item.fistName + ' Saving', 'error');
        });
    };

    $scope.findByNicNumber = function () {
        var res = $http.get("patient/findByNicNumber?id=" + $scope.patient.nicNumber).then(function (response) {
            $scope.patient = response.data.response;
            $scope.patient.dateOfBirth = new Date(response.data.response.dateOfBirth);
            $scope.showMediTest = true;
            $scope.uicompo.itemDisabled = false;
        }, function (response) {
            //Pop.msgWithButton('UPDATE','Fail User '+ item.fistName + ' Saving', 'error');
        });
    };


    var loadMedicalTestList = function (selectedTestType) {
        $http.get("medicaltest/findAllByType?testType=" + selectedTestType)
            .then(function (resp) {
                if (resp.data.success) {
                    $scope.mediTestList = resp.data.response;

                } else {
                    $scope.mediTestList = [];
                }
            });
    };

    var loadPatientMediTestList = function (patientId, selectedTestType) {
        var res = $http.get("patientmedicaltest/findAllByPatientIdAndType?patientid=" + patientId + "&type=" + selectedTestType).then(function (response) {
            if (response.data.success) {
                $scope.patientMediTestList = response.data.response;
            } else {
                $scope.patientMediTestList = [];
            }
        }, function (response) {
        });
    };

    $scope.keypress = function (e) {
        if(e.keyCode == 13){
            $scope.mediTestList = [];
            $scope.patientMediTestList = [];
            $scope.findByPatientId();
        }
    }


    onload();
});
