app.controller('MedicalTestController', function ($scope, $rootScope, $http, $location, $window) {
    $rootScope.pageTitle = "Medical Test Setup";

    $scope.medicalTestList = [];
    $scope.mtest = {};
    $scope.heading = 'Edit Medical Test Details';
    $scope.itemDisabled = false;
    $scope.actionType = '';

    var loggedUser = '-';
    if ($rootScope.globals && $rootScope.globals.currentUser) {
        loggedUser = $rootScope.globals.currentUser.username;
    }

    $scope.showUI = function (itm, opType) {
        $scope.actionType = opType;
        if ('add' === $scope.actionType) {
            $scope.heading = 'Add Medical Test Details';
            $scope.itemDisabled = false;
            $scope.mtest = {};
        } else if ('edit' === $scope.actionType) {
            $scope.heading = 'Edit Medical Test Details';
            $scope.itemDisabled = false;
            $scope.mtest = itm;
            $scope.mtest.dateOfBirth = new Date(itm.dateOfBirth);
        } else if ('delete' === $scope.actionType) {
            $scope.heading = 'Delete Medical Test Details';
            $scope.itemDisabled = true;
            $scope.mtest = itm;
        }
        $("#modal-inv").modal("show");
    };

    $scope.saveModal = function () {
        $scope.mtest.lastModified = new Date();
        $scope.mtest.actionBy = loggedUser;

        if ('add' === $scope.actionType) {
            $scope.mtest.dateCreated = new Date();
            $scope.mtest.status = 'ACTIVE';
        } else if ('edit' === $scope.actionType) {
            $scope.mtest.status = 'ACTIVE';

        } else if ('delete' === $scope.actionType) {
            $scope.mtest.status = 'DELETED';
        }

        $http.post('/medicaltest/save', $scope.mtest).then(function (response) {
            loadList();
            //reset_screen();
            //Pop.msgWithButton('New User <<'+ item.fistName + '>> Created','New user <<'+ item.userId + '>>has been created, Auto generated password for the first login user : <<'+item.userId+'>> is : <<' + item.passWord +'>>', 'success');
        }, function (response) {
            //Pop.msgWithButton('UPDATE','Fail User '+ item.fistName + ' Saving', 'error');
        });
    };


    var loadList = function () {
        $http.get("medicaltest/getList").then(function (response) {
            $scope.medicalTestList = response.data;
        });
    };
    loadList();
});
