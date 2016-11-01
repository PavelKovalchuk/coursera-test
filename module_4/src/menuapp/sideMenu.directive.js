(function () {
'use strict';

angular.module('MenuApp')
.directive('sideMenuList', sideMenuList);

function sideMenuList() {
  var ddo = {
    templateUrl: 'src/menuapp/templates/side-menu.template.html',
    scope: {
      items: '<',
      title: '@'
    },
    controller: 'sideMenuListController as sideLlist',
    bindToController: true
  };

  return ddo;
}


})();
