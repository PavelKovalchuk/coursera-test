(function () {
'use strict';

angular.module('public')
.directive('foundItems',foundItems);

function foundItems() {
  var ddo = {
    templateUrl: 'src/public/search/directives/foundItems/found-items.template.html',
    scope: {
      items: '<',
      showWarningMessage: '<',
      warningMessage: '<',
      removeItem: '&',
      quantity: '<',
      searchTerm: '<',
      sortParam: '<',
      refreshItems: '&',
      sliderMin: '<',
      sliderMax: '<'
//      sliderOptions: '<'
            
    },
    controller: 'foundItemsController as foundList',
    bindToController: true
  };

  return ddo;
}


})();
