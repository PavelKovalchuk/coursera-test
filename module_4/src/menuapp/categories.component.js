(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuapp/templates/categories-detail.template.html',
  bindings: {
    catItems: '<',
    header: '<'
  }
});

})();
