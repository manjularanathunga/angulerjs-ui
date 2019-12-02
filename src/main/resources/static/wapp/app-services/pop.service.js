(function () {
    'use strict';

    angular
        .module('app')
        .service('Pop', Pop);

    Pop.$inject = ['$rootScope', '$window'];


    function Pop($rootScope, $window) {
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

    var toast = Swal.mixin({
        toast : true,
        position : 'top-end',
        showConformButton: false,
        timer:3500
    });


})();
