'use strict';

function configAdminController($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/admin', '/admin/infoAdmin');

    $stateProvider
        .state('admin', {
            url: '/admin',
            abstract: true,
            templateUrl: 'modules/admin/admin.html',
            controller: 'AdminController',
            controllerAs: 'admin'
        });
}

function AdminController(adminService) {
    var vm = this;

    vm.msg = adminService.getMessage();
    vm.mod = adminService.module;
}

angular.module('myAdmin', [])
    .config(configAdminController)
    .controller('AdminController', AdminController);