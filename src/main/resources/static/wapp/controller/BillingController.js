app.controller('BillingController', function($scope, $rootScope, $http, $location, $window, AuthenticationService, Pop) {
    $rootScope.pageTitle = "Patient Medical Test Billing";
    var loggedUser = '-';
    if ($rootScope.globals && $rootScope.globals.currentUser) {
        loggedUser = $rootScope.globals.currentUser.username;
    }

    $scope.btnAddShow = true;
    $scope.btnSearch = true;
    $scope.btnEditShow = false;
    $scope.btnDelShow = false;
    $scope.btnReset = true;
    $scope.isDisabledSave = true;

    $scope.ptestList = [];
    $scope.testTypeList = [];
    $scope.mediTestList = [];
    $scope.patientMediTestList = [];
    $scope.seenByList = [];
    $scope.districtByList = [];

    $scope.billingList = [];

    $scope.patient = {};
    $scope.patient.dateCreated = new Date();
    $scope.patient.currentAge = 0;
    $scope.showMediTest = false;
    $scope.uicompo = {};
    $scope.uicompo.selectedTest = {};
    $scope.uicompo.itemDisabled = true;



    var onload = function() {
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

        $scope.seenByList.push({
            name: "Dr.XXXX"
        });

        $scope.ptestList.push({
            "id": 1,
            "patientId": "P0001",
            "nicNumber": "7878787V",
            "other": "xc",
            "patientName": "xxxxxx",
            "telNumber": "xcxc",
            "dateOfBirth": "2019-12-18T16:00:00.000+0000",
            "gender": "MALE",
            "seenBy": "xcx",
            "actionBy": "-",
            "bht": null,
            "dateCreated": "2019-12-14T03:00:24.752+0000",
            "lastModified": "2019-12-14T03:00:24.752+0000",
            "status": "ACTIVE"
        }, {
            "id": 2,
            "patientId": "P0002",
            "nicNumber": "8787878v",
            "other": "as",
            "patientName": "asasasas",
            "telNumber": "as",
            "dateOfBirth": "2019-12-17T16:00:00.000+0000",
            "gender": "MALE",
            "seenBy": "as",
            "actionBy": "-",
            "bht": null,
            "dateCreated": "2019-12-14T07:00:12.083+0000",
            "lastModified": "2019-12-14T07:00:12.083+0000",
            "status": "ACTIVE"
        });

        $scope.districtByList.push({
            name: "KANDY"
        });
        $scope.districtByList.push({
            name: "MATALE"
        });
        $scope.districtByList.push({
            name: "NUWARA-ELIYA"
        });


        //$scope.loadPatientList();
    };

    $scope.showUI = function(itm, opType) {
        $scope.actionType = opType;
        if ('delete' === $scope.actionType) {
            $http.delete("patientmedicaltest/delete?id=" + itm.id);
            loadPatientMediTestList();
        }
    };

    $scope.saveModal = function() {
        $scope.patient.lastModified = new Date();
        $scope.patient.actionBy = loggedUser;
        $scope.patient.dateCreated = new Date();
        var patientId = $scope.patient.patientId;
        $scope.patient.status = 'ACTIVE';
        $http.post('/patient/save', $scope.patient)
            .then(function(resp) {
                Pop.timeMsg('success', 'ADDED PATIENT', ' PATIENT HAS BEEN SAVED SUCCESSFULLY ', 2000);
                $scope.clearCurrentPatient();
                $scope.findByPatientId(patientId);
            }, function(resp) {

            }).catch(function(e) {
                Pop.timeMsg('error', 'ADDED PATIENT', ' PATIENT SAVING NOT SUCCESS ' + e, 5000);
            });
    };

    $scope.onSelectTestType = function() {
        loadMedicalTestList($scope.uicompo.selectedTestType);
        if ($scope.patient) {
            loadPatientMediTestList($scope.patient.patientId, $scope.uicompo.selectedTestType);
        } else {
            $scope.mediTestList = [];
            $scope.patientMediTestList = [];
        }
    };


    $scope.saveUpdatePatient = function() {

    };

    $scope.addSelectedTest = function() {

        var selected = $scope.uicompo.selectedTest;

        var saveTest = {};

        if(!selected){
            Pop.timeMsg('error', 'MEDICAL TEST ADDED ', ' PLEASE SELECT THE TEST ', 2000);
            return;
        }

        saveTest = JSON.parse(selected);

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

        saveTest.testNumber = saveTest.testNumber;
        saveTest.patientId = $scope.patient.patientId;
        saveTest.lastDateModified = new Date();
        saveTest.dateCreated = new Date();
        saveTest.actionBy = loggedUser;
        saveTest.seenBy = $scope.patient.seenBy;
        saveTest.id = null;
        saveTest.billingNumber = $scope.uicompo.billingNumber;

        $scope.billingList.push(saveTest);

/*        $http.post('/patientmedicaltest/save', saveTest)
            .then(function(resp) {

                Pop.timeMsg('success', 'MEDICAL TEST ADDED ', ' TEST HAS BEEN ADDED TO PATIENT ', 2000);
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
            }, function(resp) {
                Pop.msgWithButton('MEDICAL TEST ADDED', resp.data.error, 'error');
            }).catch(function(err) {
            Pop.msgWithButton('MEDICAL TEST ADDED', resp.data.error, 'error');
            //loadPatientMediTestList($scope.patient.patientId, $scope.uicompo.selectedTestType);
            });*/
    };

    $scope.saveTestList = function() {
        if($scope.billingList.length == 0){
            Pop.msgWithButton('ADD MEDICAL TEST', 'NO TEST ITEM ADDED', 'error');
            return;
        }

        $http.post('/patientmedicaltest/saveList', $scope.billingList)
            .then(function(resp) {
                Pop.timeMsg('success', 'MEDICAL TEST ADDED ', ' TEST HAS BEEN ADDED TO PATIENT ', 2000);

            });
    };


    $scope.clearCurrentPatient = function() {
        $scope.patient = {};
        $scope.medicalTest = {};
        $scope.patientMediTestList = [];
        $scope.mediTestList = [];
        $scope.showMediTest = false;
        $scope.uicompo.itemDisabled = true;
        $scope.isDisabledSave = true;
    };

    $scope.loadPatientList = function() {
        //console.log('loadPatientList');
        if ($scope.patient.patientId.length > 3) {
            $http.get("patient/findByPatientListById?patientId=" + $scope.patient.patientId)
                .then(function(response) {
                    $scope.ptestList = response.data.response;
                });
        }
    };

    $scope.loadPatientListByNIC = function() {
        if ($scope.patient.nicNumber.length > 3) {
            $http.get("patient/findByPatientListById?nicNumber=" + $scope.patient.nicNumber)
                .then(function(response) {
                    $scope.ptestList = response.data.response;
                });
        }
    };


    $scope.findByPatientId = function(patientId) {
        $http.get("patient/findByPatientId?patientId=" + patientId)
            .then(function(resp) {
                $scope.patient = resp.data.response;
                $scope.patient.dateOfBirth = new Date(resp.data.response.dateOfBirth);
                $scope.showMediTest = true;
                $scope.uicompo.itemDisabled = true;
                $scope.isDisabledSave = true;
                $scope.patient.currentAge = (new Date().getFullYear() - $scope.patient.dateOfBirth.getFullYear());
                $("#modal-billing-search").modal("hide");
            }, function(response) {
                //Pop.msgWithButton('UPDATE','Fail User '+ item.fistName + ' Saving', 'error');
            }).catch(function() {
                //Pop.timeMsg('error', 'ADDED PATIENT', ' PATIENT SAVING NOT SUCCESS ' + e, 3000);
            });
    };

    $scope.findByNicNumber = function() {
        var res = $http.get("patient/findByNicNumber?id=" + $scope.patient.nicNumber)
            .then(function(resp) {
                $scope.patient = resp.data.response;
                $scope.patient.dateOfBirth = new Date(resp.data.response.dateOfBirth);
                $scope.showMediTest = true;
                $scope.uicompo.itemDisabled = true;
                $scope.isDisabledSave = true;
                $scope.patient.currentAge = (new Date().getFullYear() - $scope.patient.dateOfBirth.getFullYear());
                $("#modal-billing-search").modal("hide");
            }, function(response) {
                //Pop.msgWithButton('UPDATE','Fail User '+ item.fistName + ' Saving', 'error');
            });
    };


    var loadMedicalTestList = function(selectedTestType) {
        $http.get("medicaltest/findAllByType?testType=" + selectedTestType)
            .then(function(resp) {
                if (resp.data.success) {
                    $scope.mediTestList = resp.data.response;

                } else {
                    $scope.mediTestList = [];
                }
            });
    };

    var loadPatientMediTestList = function(patientId, selectedTestType) {
        var res = $http.get("patientmedicaltest/findAllByPatientIdAndType?patientid=" + patientId + "&type=" + selectedTestType).then(function(response) {
            if (response.data.success) {
                $scope.patientMediTestList = response.data.response;
            } else {
                $scope.patientMediTestList = [];
            }
        }, function(response) {});
    };

    $scope.keypressId = function(e) {
        if (e.keyCode == 13) {
            $scope.mediTestList = [];
            $scope.patientMediTestList = [];
            $scope.findByPatientId($scope.patient.patientId);

        }
    }

    $scope.keypressNic = function(e) {
        if (e.keyCode == 13) {
            $scope.mediTestList = [];
            $scope.patientMediTestList = [];
            $scope.findByNicNumber();
        }
    }

    $scope.showSearch = function search() {
        $scope.patient = {};
        $("#modal-billing-search").modal("show");
    }

    $scope.showAddTest = function search() {
        $("#modal-add-test").modal("show");
    }

    $scope.loadByBillingNum = function search() {
        Pop.timeMsg('warning', 'Search By Billing # ', ' Page under maintenance ', 2000);
    }

    $scope.addNewPatient = function search() {
        $http.get("patient/getNextPatientId")
            .then(function(resp) {
                $scope.clearCurrentPatient();
                $scope.uicompo.itemDisabled = false;
                $scope.isDisabledSave = false;
                $scope.patient.patientId = resp.data.response;
            }, function(error) {
                //console.log('error > ' + error);
            });
    }
    onload();
});
