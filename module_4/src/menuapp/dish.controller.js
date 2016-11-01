(function () {
'use strict';

angular.module('MenuApp')
.controller('DishController', DishController);


DishController.$inject = ['dish'];
function DishController(dish) {
  var dishInfo = this;
  dishInfo.dishItem = dish.itemData[0];
  dishInfo.dishCategory = dish.category;
  dishInfo.header = 'Description of the dish ';
}

})();
