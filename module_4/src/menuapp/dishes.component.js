(function () {
'use strict';

angular.module('MenuApp')
.component('dishes', {
  templateUrl: 'src/menuapp/templates/dishes-detail.template.html',
  bindings: {
    dishItems: '<',
    category: '<',
    header: '<'
  }
});

})();
