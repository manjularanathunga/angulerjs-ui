app.controller('BillingController', function ($scope, $rootScope, $http, $location, $window, AuthenticationService, Pop) {
    $rootScope.pageTitle = "Billing";
    var loggedUser = '-';
    if ($rootScope.globals && $rootScope.globals.currentUser) {
        loggedUser = $rootScope.globals.currentUser.username;
    }

    $scope.ptestList = [];
    $scope.testTypeList = [];
    $scope.mediTestList = [];
    $scope.patientMediTestList = [];

    $scope.patient = {};
    $scope.patient.dateCreated = new Date();
    $scope.patient.currentAge = 0;
    $scope.itemDisabled = false;
    $scope.showMediTest = false;
    $scope.uicompo = {};
    $scope.uicompo.selectedTest = {};


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

        loadPatientList();

/*        $scope.ptestList.push({"id":1,"patientId":"abcd","nicNumber":"1231","other":"abcd","patientName":"abcd","telNumber":"aabcd","dateOfBirth":"1970-01-01T00:00:00.000+0000","gender":"MALE","seenBy":"a","actionBy":"-","bht":null,
                "dateCreated":"2019-12-12T12:41:44.734+0000","lastModified":"2019-12-12T13:47:42.748+0000","status":"ACTIVE"});*/

        $scope.mediTestList.push({"id":6,"testType":"P","mtnumber":"df","name":"fdf","price":100.0,"actionBy":"-",
            "dateCreated":"2019-12-13T18:10:11.064+0000","lastModified":"2019-12-13T18:11:38.176+0000","status":"ACTIVE"});
    };


    $scope.findByPatientId = function () {
        var res = $http.get("patient/findByPatientId?id=" + $scope.patient.patientId).then(function (response) {
            $scope.patient = response.data.response;
            $scope.patient.dateOfBirth = new Date(response.data.response.dateOfBirth);
            $scope.showMediTest = true;
        }, function (response) {
            //Pop.msgWithButton('UPDATE','Fail User '+ item.fistName + ' Saving', 'error');
        });
    }

    $scope.findByNicNumber = function () {
        var res = $http.get("patient/findByNicNumber?id=" + $scope.patient.nicNumber).then(function (response) {
            $scope.patient = response.data.response;
            $scope.patient.dateOfBirth = new Date(response.data.response.dateOfBirth);
            $scope.showMediTest = true;
        }, function (response) {
            //Pop.msgWithButton('UPDATE','Fail User '+ item.fistName + ' Saving', 'error');
        });
    }


    $scope.showUI = function (itm, opType) {
        $scope.actionType = opType;
        if ('add' === $scope.actionType) {
            /*            $scope.heading='Add Patient Details';
                        $scope.itemDisabled=false;
                        $scope.patient={};
                        $scope.patient.status = 'ACTIVE';*/
        } else if ('edit' === $scope.actionType) {
            /*            $scope.heading='Edit Patient Details';
                        $scope.itemDisabled=false;
                        $scope.patient=itm;
                        $scope.patient.dateOfBirth=new Date(itm.dateOfBirth);*/
        } else if ('delete' === $scope.actionType) {
            /*            $scope.heading='Delete Patient Details';
                        $scope.itemDisabled=true;
                        $scope.patient=itm;*/
            var res = $http.delete("patientmedicaltest/delete?id=" + itm.id);
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
    }


    $scope.saveUpdatePatient = function () {

    }

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

        if (!saveTest.price) {
            Pop.msgWithButton('ADD MEDICAL TEST', 'Test price not selected', 'error');
            return;
        }

        saveTest.testNumber = new Date().getFullYear() + '' + saveTest.testType + '00001';
        saveTest.patientId = $scope.patient.patientId;
        saveTest.lastDateModified = new Date();
        saveTest.dateCreated = new Date();
        saveTest.actionBy = loggedUser;

        $http.post('/patientmedicaltest/save', saveTest)
            .then(function (resp) {
            if (resp.data.success) {
                Pop.timeMsg('success', 'MEDICAL TEST ADDED ', '<<' + $scope.medicalTest.mtnumber + '>> has been added to patient <<' + b.patientId + '>>', 3000);
                $scope.medicalTest = {};
                $scope.mtest = {};
                loadPatientMediTestList($scope.patient.patientId, $scope.uicompo.selectedTestType);
            } else {
                Pop.timeMsg('error', 'MEDICAL TEST ADDED ', '<<' + $scope.medicalTest.mtnumber + '>> has not added to <<' + b.patientId + '>>', 3000);
                $scope.mediTestList = [];
            }
        }, function (resp) {
            Pop.msgWithButton('MEDICAL TEST ADDED',resp.data.error, 'error');
        });

    };


    $scope.clearCurrentPatient = function () {
        $scope.patient = {};
        $scope.medicalTest = {};
        $scope.patientMediTestList = [];
        $scope.mediTestList = [];
        $scope.showMediTest = false;
    }

    var loadPatientList = function () {
        $http.get("patient/getList").then(function (response) {
            $scope.ptestList = response.data;
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


    onload();
});
