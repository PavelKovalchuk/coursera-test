(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // categories list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories.template.html',
    controller: 'CategoriesListController as catList',
    resolve: {
        catItems:   ['MenuDataService', 
                    function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
    }
  })

  // dishes detail
  .state('dishes', {
    url: '/dishes/{ShortName}',
    templateUrl: 'src/menuapp/templates/dishes.template.html',
    controller: 'DishesListController as dishList',
    resolve: {
        dishes: ['$stateParams', 'MenuDataService',
              function ($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.ShortName);
              }]
    }
  })
  
  
  // dish detail
  .state('dish', {
    url: '/dishes/{ShortName}/{itemId}',
    templateUrl: 'src/menuapp/templates/dish.template.html',
    controller: 'DishController as dish',
    resolve: {
        dish: ['$stateParams', 'MenuDataService',
              function ($stateParams, MenuDataService) {
                return MenuDataService.getItem($stateParams.ShortName, $stateParams.itemId);
              }]
    }
  })
;

}

})();
