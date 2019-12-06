app.controller('UserAdminController', function($scope,$rootScope, $http, $location, $window, Pop) {
    $rootScope.pageTitle = "useradmin";

    var loggedUser = '-';
    if($rootScope.globals && $rootScope.globals.currentUser){
        loggedUser = $rootScope.globals.currentUser.username;
    }

    $scope.btnAddShow = true;
    $scope.btnEditShow = true;
    $scope.btnDelShow = true;
    $scope.btnPwRstShow = true;
    $scope.btnResetShow = false;
    $scope.save_is_disabled = true;

    $scope.useris_show = true;
    $scope.actionType = '';
    $scope.useradmin = {};
    $scope.users={};
    $scope.component_is_disabled = true;
    $scope.userid = '';

    $scope.reset = function () {
        $scope.useris_show = true;
        reset_screen();
    }

    var reset_component = function(){
        $scope.useradmin = {};
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

    $scope.save_submit = function () {
        var actionType = $scope.actionType;
        var item = $scope.useradmin;
        item.dateCreated = new Date();
        item.actionBy = loggedUser;
        console.log('actionType >' + actionType);
        console.log('$scope.users >' + JSON.stringify($scope.users));
        if(actionType === 'add'){
            if(isEmpty(item.userId)){
                Pop.timeMsg('warning','USERID Cannot be empty','Warning Message',1000);
                return true;
            }
            if(validateFields(item)){return;}
            item.lastDateModified = new Date();
            Pop.msgWithButton('Save User '+ item.fistName, 'SAVE','success');
        }else if(actionType === 'edit'){
            Pop.msgWithButton('Updated User '+ item.fistName, 'UPDATE','success');
        }else if(actionType === 'delete'){
            Pop.msgWDelete('DELETE USER','Are sure to delete User ' + item.fistName,'warning','User has been delete','delete aborted')
        }
    }

    var isEmpty = function(val){
        if(!val)
            return true;
        else
            return false;
    }

    var validateFields = function(item){
        if(isEmpty(item.fistName)){
            Pop.timeMsg('warning','fistName Cannot be empty','Warning Message',1000);
            return true;
        } else if (isEmpty(item.middleName)){
            Pop.timeMsg('warning','middleName Cannot be empty','Warning Message',1000);
            return true;
        } else if (isEmpty(item.lastName)){
            Pop.timeMsg('warning','lastName Cannot be empty','Warning Message',1000);
            return true;
        } else if (isEmpty(item.passWord)){
            Pop.timeMsg('warning','passWord Cannot be empty','Warning Message',1000);
            return true;
        } else if (isEmpty(item.userRoles)){
            Pop.timeMsg('warning','userRoles Cannot be empty','Warning Message',1000);
            return true;
        } else if (isEmpty(item.userEmail)){
            Pop.timeMsg('warning','userEmail Cannot be empty','Warning Message',1000);
            return true;
        } else if (isEmpty(item.userPFNumber)){
            Pop.timeMsg('warning','userPFNumber Cannot be empty','Warning Message',1000);
            return true;
        } else if (isEmpty(item.telNumber)){
            Pop.timeMsg('warning','telNumber Cannot be empty','Warning Message',1000);
            return true;
        } else if (isEmpty(item.mobNumber)){
            Pop.timeMsg('warning','mobNumber Cannot be empty','Warning Message',1000);
            return true;
        }
        return false;
    }

    var loadList = function () {
        $http.get("users/getList").then(function (response) {
            $scope.userAdminList = response.data;
        });
    };
    loadList();
});

