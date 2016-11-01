(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesListController', CategoriesListController);


CategoriesListController.$inject = ['catItems'];
function CategoriesListController(catItems) {
  var catList = this;
  catList.catItems = catItems;
  catList.header = 'List of categories';
}

})();
