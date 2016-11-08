(function () {
'use strict';

angular.module('public')
.controller('sideMenuListController', sideMenuListController);

sideMenuListController.$inject = ['MenuService'];
function sideMenuListController(MenuService) {
  
  var list = this;
  
  list.items = '';
  
  list.getCategoriesItems = function(){
        MenuService.getCategories()
        .then(function(response) { 
            list.items = response; 
        });
  };
  
}


})();
