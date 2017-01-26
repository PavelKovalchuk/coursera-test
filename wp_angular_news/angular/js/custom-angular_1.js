angular.module('app', ['ngRoute','ngSanitize'])

.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider
        
	.when('/en/news_test/', {
		templateUrl: templatePath.partials + 'main.html',
		controller: 'Main'
	})
        
//        .when('/en/news_test/:ID', {
//		templateUrl: templatePath.partials + 'postContent.html',
//		controller: 'postContent'
//	})
        
        .when('/en/news_test/:slug', {
		templateUrl: templatePath.partials + 'postContent.html',
		controller: 'postContentSlug'
	});
})


.controller('Main', function($scope, $http, $routeParams) {
	
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

.controller('postContent', function($scope, $http, $routeParams) {
	        
        $http.get("http://promx.webdev.acceptic.com/wp-json/wp/v2/posts/" + $routeParams.ID)
        .then(function(response) {
            //First function handles success
            $scope.post = response.data;
        }, function(response) {
            //Second function handles error
            $scope.post = "Something went wrong";
        });
        
        
        
})

.controller('postContentSlug', function($scope, $http, $routeParams) {
	        
        $http.get("http://promx.webdev.acceptic.com/wp-json/wp/v2/posts/?filter[name]=" + $routeParams.slug)
        .then(function(response) {
            //First function handles success
            console.log(response.data);
            $scope.post = response.data[0];
        }, function(response) {
            //Second function handles error
            $scope.post = "Something went wrong";
        });
        
        
        
})

.filter('toTrusted', ['$sce', function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
}])

;