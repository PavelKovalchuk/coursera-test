(function () {
'use strict';



angular.module('app', ['ui.router', 'ngRoute', 'ngSanitize'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
    
    // For any unmatched url, redirect to /state1 
    $urlRouterProvider.otherwise("/");

    $stateProvider

    // Home page
    .state('blog', {
      url: '/en/news_test/',
      templateUrl: templatePath.partials + 'main.html',
      controller: 'Main'
    })
    
     // post detail
    .state('post', {
      url: '/en/news_test/{slug}',
      templateUrl: templatePath.partials + 'postContent.html',
      controller: 'postContentSlug'
//      resolve: {
//          dish: ['$stateParams', 'MenuDataService',
//                function ($stateParams, MenuDataService) {
//                  return MenuDataService.getItem($stateParams.ShortName, $stateParams.itemId);
//                }]
//      }
    });
    
    
})






.controller('Main', function($scope, $http, $stateParams) {
	
        var catEnglID = 'filter[cat]=' + 475;
        var catEnglSlug = 'filter[category_name]=' + 'latest-news';
        $http.get("http://promx.webdev.acceptic.com/wp-json/wp/v2/posts/" + "?filter[posts_per_page]=" + 80 + '&' + catEnglID)
        .then(function(response) {
            //First function handles success
            $scope.posts = response.data;
        }, function(response) {
            //Second function handles error
            $scope.posts = "Something went wrong";
        });
        
})

.controller('postContent', function($scope, $http, $stateParams) {
	        
        $http.get("http://promx.webdev.acceptic.com/wp-json/wp/v2/posts/" + $stateParams.ID)
        .then(function(response) {
           
            $scope.post = response.data;
        }, function(response) {
           
            $scope.post = "Something went wrong";
        });
        
        
        
})

.controller('postContentSlug', function($scope, $http, $stateParams) {
	        
        $http.get("http://promx.webdev.acceptic.com/wp-json/wp/v2/posts/?filter[name]=" + $stateParams.slug)
        .then(function(response) {
         
            console.log(response.data);
            $scope.post = response.data[0];
        }, function(response) {
           
            $scope.post = "Something went wrong";
        });
        
        
        
})

.filter('toTrusted', ['$sce', function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
}])

;


})();