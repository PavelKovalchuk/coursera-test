(function () {
'use strict';

angular.module('public')
.directive('sideMenuList', sideMenuList);

function sideMenuList() {
  var ddo = {
    templateUrl: 'src/public/plugins/side-menu/side-menu.template.html',
    scope: {
      items: '<'
     
    },
    controller: 'sideMenuListController as sideLlist',
    bindToController: true
  };

  return ddo;
}


})();
