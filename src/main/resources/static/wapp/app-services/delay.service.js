(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('DlAlert', DlAlert);

    DlAlert.$inject = ['$rootScope', '$window'];


    function DlAlert($rootScope, $window) {
        var service = {};
        service.showMsg = showMsg;
        service.showDelay = showDelay;
        service.setFocus = setFocus;

        return service;

        function showMsg(sign, msg) {
            toast({
                type: sign,
                title: msg
            });
        }

        function showDelay(type) {
            $rootScope.showDelay(type)
        }

        function setFocus(obj) {
            var element = $window.getElementById(obj);
            if(element) {element.setFocus();}

        }

    }

    const toast = Swal.mixin({
        toast : true,
        position : 'top-end',
        showConformButton: false,
        timer:3500
    });


})();
