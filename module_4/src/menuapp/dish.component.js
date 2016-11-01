(function () {
'use strict';

angular.module('MenuApp')
.component('dish', {
  templateUrl: 'src/menuapp/templates/dish-detail.template.html',
  bindings: {
    dishItem: '<',
    category: '<',
    header: '<'
  }
});

})();
