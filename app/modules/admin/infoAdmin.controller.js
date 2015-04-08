'use strict';

function configInfoAdminController($stateProvider) {
    $stateProvider
        .state('admin.infoAdmin', {
            url: '/infoAdmin',
            templateUrl: 'modules/admin/infoAdmin.html',
            controller: 'InfoAdminController',
            controllerAs: 'infoAdmin',
            data: {
                rolesAllowed: ['admin', 'krym_kavkaz', 'kavkaz_krym']
            }
        });
}

function InfoAdminController(adminService) {
    var vm = this;

    vm.msg = adminService.getMessage();
    vm.mod = adminService.module;
}

angular.module('myInfoAdmin', [])
    .config(configInfoAdminController)
    .controller('InfoAdminController', InfoAdminController);