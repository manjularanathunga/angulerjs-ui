app.controller('UserAdminController', function($scope,$rootScope, $http, $location, $window) {
    $rootScope.pageTitle = "UserAdmin";

    $scope.btnAddShow = true;
    $scope.btnEditShow = true;
    $scope.btnDelShow = true;
    $scope.btnPwRstShow = true;
    $scope.btnResetShow = false;
    $scope.save_is_disabled = true;

    $scope.useris_show = true;
    $scope.actionType = '';
    $scope.sysuser = {};
    $scope.component_is_disabled = true;
    $scope.userid = '';



    $scope.reset = function () {
        $scope.useris_show = true;
        reset_screen();
    }

    var reset_component = function(){
        $scope.sysuser = {};
    }

    var reset_screen =function () {
        $scope.component_is_disabled = true;
        $scope.actionType = '';
        restore_Button();

    }

    var restore_Button = function () {
        console.log('call restore_Button');
        $scope.btnAddShow = true;
        $scope.btnEditShow = true;
        $scope.btnDelShow = true;
        $scope.btnPwRstShow = true;
        $scope.btnResetShow = false;
        $scope.save_is_disabled = true;
    }

    var disable_Button = function () {
        console.log('call disable_Button');
        $scope.btnAddShow = false;
        $scope.btnEditShow = false;
        $scope.btnDelShow = false;
        $scope.btnPwRstShow = false;
        $scope.btnResetShow = true;
        $scope.save_is_disabled = false;
    }

    $scope.add = function () {
        disable_Button();
        $scope.actionType = 'add';
        $scope.useris_show = false;
        $scope.component_is_disabled = false;
    }

    $scope.edit = function () {
        disable_Button();
        $scope.actionType = 'edit';

        $scope.useris_show = false;
        $scope.component_is_disabled = false;
    }

    $scope.delete = function () {
        disable_Button();
        $scope.actionType = 'delete';
        $scope.useris_show = false;
    }

    $scope.reset_password = function () {
        disable_Button();
        $scope.actionType = 'reset_password';
    }



});
