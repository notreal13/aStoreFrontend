'use strict';

function configCategoryController($stateProvider) {
  $stateProvider
        .state('category', {
            url: '/category',
            templateUrl: 'modules/category/category.html',
            controller: 'CategoryController',
            controllerAs: 'category'
        });
}

function CategoryController(categoryService) {
    var vm = this;

    vm.allCategories = categoryService.query();
}

angular.module('myCategory', [])
    .config(configCategoryController)
    .controller('CategoryController', CategoryController);