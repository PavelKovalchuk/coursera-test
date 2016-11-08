(function () {
'use strict';

angular.module('public')
.directive('featuredMenuItems', featuredMenuItems);

function featuredMenuItems() {
  var ddo = {
    templateUrl: 'src/public/plugins/featured-menu-items.template.html',
    scope: {
      category: '<'
      
    },
    controller: 'featuredMenuItemsController as list',
    bindToController: true
  };

  return ddo;
}


})();
