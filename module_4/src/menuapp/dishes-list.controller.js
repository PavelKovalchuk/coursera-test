(function () {
'use strict';

angular.module('MenuApp')
.controller('DishesListController', DishesListController);


DishesListController.$inject = ['dishes'];
function DishesListController(dishes) {
  var dishList = this;
  dishList.dishItems = dishes.menu_items;
  dishList.dishCategory = dishes.category;
  dishList.header = 'List of dishes for category ';
  
}

})();
