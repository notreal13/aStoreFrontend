'use strict';

function configTicketAdminController($stateProvider) {
  $stateProvider
    .state('admin.ticketAdmin', {
      url: '/ticketAdmin',
      templateUrl: 'modules/admin/ticketAdmin.html',
      controller: 'TicketAdminController',
      controllerAs: 'ticketAdmin',
      data: {
        rolesAllowed: ['admin']
      }
    });
}

function TicketAdminController(ticketService, categoryService, adminService, $scope, categoryHash) {
  var vm = this;

  adminService.clean();
  vm.msg = adminService.getMessage();
  adminService.module.name = vm.constructor.name;

  vm.categoryHash = categoryHash;

  var categories = categoryService.query();
  categories.$promise.then(function(data) {
      for (var i = 0; i < data.length; i++) {
        categoryHash[data[i].id] = data[i].name;
      }
  });
  
  vm.gridOptions = {
    enableFiltering: true,
    showGridFooter: true,
    /*how long a wait will be before a save is triggered (in ms)*/
    rowEditWaitInterval: 1000,
    paginationPageSizes: [15, 30, 60],
    paginationPageSize: 15,
    columnDefs: [{
      name: 'id',
      enableCellEdit: false,
      width: '5%'
    }, {
      name: 'name',
      enableCellEdit: true,
      width: '8%'
    }, {
      name: 'price',
      enableCellEdit: true,
      type: 'number',
      cellFilter: 'currency',
      width: '8%'
    }, {
      name: 'description',
      enableCellEdit: true,
      width: '10%'
    }, {
      name: 'lastUpdate',
      enableCellEdit: false,
      cellFilter: 'date: "yyyy-MM-dd HH:mm:ss"',
      width: '15%'
    }, {
      name: 'dataLabel',
      enableCellEdit: true,
      width: '10%'
    }, {
      name: 'category.id',
      width: '15%',
      cellFilter: 'mapCategory',
      editableCellTemplate: 'ui-grid/dropdownEditor',
      editDropdownValueLabel: 'name',
      editDropdownOptionsArray: categories
    }]
  };

  vm.gridOptions.data = ticketService.query();

  vm.addData = function() {
    var n = vm.gridOptions.data.length + 1;
    vm.gridApi.pagination.seek(vm.gridApi.pagination.getTotalPages());
    vm.gridApi.cellNav.scrollTo(
      vm.gridOptions.data[n % vm.gridOptions.paginationPageSize], vm.gridOptions.columnDefs[0]
    );
    var newTicket = {
      'name': 'NewName ' + n,
      'price': 0,
      'description': 'description ' + n,
      'dataLabel': 'label ' + n,
      'category': {
        id: 1,
        name: ''
      }
    };
    vm.gridOptions.data.push(newTicket);
    var promise = ticketService.save(newTicket);
    promise.$promise
      .then(
        function(result) {
          setMessage('successfully created');
          newTicket.id = result.id;
        },
        function(result) {
          setMessage('failure create', result.data);
        });
  };

  vm.saveRow = function(rowEntity) {
    var id = rowEntity.id;
    var promise = ticketService.update({
      id: id
    }, rowEntity);

    promise.$promise
      .then(
        function() {
          setMessage('successfully edited');
        },
        function(result) {
          setMessage('failure update', result.data);
        });

    vm.gridApi.rowEdit.setSavePromise(rowEntity, promise.$promise);

  };

  var getIndexOfEntity = function(id) {
    for (var i = 0; i < vm.gridOptions.data.length; i++) {
      if (id === vm.gridOptions.data[i].id) {
        return i;
      }
    }
    return -1;
  };

  vm.removeDataConfirm = function() {
    var rowCol = vm.gridApi.cellNav.getFocusedCell();
    if (rowCol !== null) {
      vm.focusedRow = rowCol.row.entity;
      $('#myModal').modal('show');
    } else {
      setMessage('You have not selected any row');
    }
  };

  vm.removeData = function() {
    var id = vm.focusedRow.id;
    var promise = ticketService.delete({
      id: id
    });
    promise.$promise
      .then(
        function() {
          setMessage('successfully removed');
          vm.gridOptions.data.splice(getIndexOfEntity(id), 1);
        },
        function(result) {
          setMessage('failure remove', result.data);
        });
  };

  vm.gridOptions.onRegisterApi = function(gridApi) {
    vm.gridApi = gridApi;
    gridApi.rowEdit.on.saveRow($scope, vm.saveRow);
  };

  var setMessage = function(text, adv) {
    vm.msg.text = text;
    if (adv) {
      vm.msg.adv = adv;
    } else {
      vm.msg.adv = '';
    }
  };

}

function mapCategory(categoryHash) {
  function catFilter(input) {
    return categoryHash[input];
  }
  return catFilter;
}

angular.module('myTicketAdmin', [])
  .config(configTicketAdminController)
  .controller('TicketAdminController', TicketAdminController)
  .filter('mapCategory', mapCategory)
  .value('categoryHash', {
    0: '-'
  });