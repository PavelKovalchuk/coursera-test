

(function () {
'use strict';



angular.module('app', ['ui.router', 'data', 'ngSanitize'])

.config(RoutesConfig)
.filter('toTrusted', toTrusted)
.filter('removeHTMLTags', removeHTMLTags)

.controller('MainController', MainController)
.controller('PostContentController', PostContentController)
.controller('PagedController', PagedController)
.controller('PostsNavLinkController', PostsNavLinkController)
.directive('postsNavLink', postsNavLink);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'pageNameEN', 'pageNameDE', 'prefixEN', 'prefixDE'];

function RoutesConfig($stateProvider, $urlRouterProvider, $locationProvider, pageNameEN, pageNameDE, prefixEN, prefixDE) {
    $locationProvider.html5Mode(true);
   
//    var pageNameEN = 'news_test';
//    
//    var pageNameDE = 'neuigkeiten-test';

    
    // For any unmatched url, redirect to /state1 
    $urlRouterProvider.otherwise(prefixEN + '/' + pageNameEN + '/');

    $stateProvider

    
    // Home page EN
    .state('blog_EN', {
        url: prefixEN + '/' + pageNameEN + '/',
        templateUrl: WPOptions.partials + 'main.html',
        controller: 'MainController as main',
        resolve: {
            posts: ['PostDataService',
                    function (PostDataService) {
                        return PostDataService.getPostsList('en', 1);
                  }],
            page: ['PostDataService',
                    function (PostDataService) {
                        return PostDataService.getPageBySlug( pageNameEN );
                 }]
        }
    })
    
    // Home page DE
    .state('blog_DE', {
        url: prefixDE + '/' + pageNameDE + '/',
        templateUrl: WPOptions.partials + 'main.html',
        controller: 'MainController as main',
        resolve: {
            posts: ['PostDataService',
                    function (PostDataService) {
                        return PostDataService.getPostsList('de', 1);
                  }],
            page: ['PostDataService',
                function (PostDataService) {
                    return PostDataService.getPageBySlug( pageNameDE );
             }]
        }
    })
    
     // paged EN
    .state('paged_EN', {
      url: prefixEN + '/' + 'category/latest-news/page/{paged}/',
      templateUrl: WPOptions.partials + 'main.html',
      controller: 'PagedController as main',
        resolve: {
            posts: ['PostDataService', '$stateParams',
                    function (PostDataService, $stateParams) {
                        return PostDataService.getPostsList('en', $stateParams.paged);
                  }],
            page: ['PostDataService',
                function (PostDataService) {
                    return PostDataService.getPageBySlug( pageNameEN );
             }]
      }
    })
    
    
    // paged DE
    .state('paged_DE', {
      url: prefixDE + '/' + 'category/aktuelle-meldungen/page/{paged}/',
      templateUrl: WPOptions.partials + 'main.html',
      controller: 'PagedController as main',
        resolve: {
            posts: ['PostDataService', '$stateParams', 
                    function (PostDataService, $stateParams) {
                        return PostDataService.getPostsList('de', $stateParams.paged);
                  }],
            page: ['PostDataService',
                function (PostDataService) {
                    return PostDataService.getPageBySlug( pageNameDE );
             }]
      }
    })
    
   
    
     // post detail
    .state('post_EN', {
      url: prefixEN + '/' + '{year}/{month}/{slug}/',
      templateUrl: WPOptions.partials + 'postContent.html',
      controller: 'PostContentController as content',
        resolve: {
            post: ['$stateParams', 'PostDataService',
                function ($stateParams, PostDataService) {
                  return PostDataService.getPost($stateParams.slug);
                }]
      }
    })
    
    // post detail
    .state('post_DE', {
      url: prefixDE + '/' + '{year}/{month}/{slug}/',
      templateUrl: WPOptions.partials + 'postContent.html',
      controller: 'PostContentController as content',
        resolve: {
            post: ['$stateParams', 'PostDataService',
                function ($stateParams, PostDataService) {
                  return PostDataService.getPost($stateParams.slug);
                }]
      }
    })
    
   
    ;
}




function removeHTMLTags() {
    return function(text) {
            return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
};


toTrusted.$inject = ['$sce'];

function toTrusted($sce) {
    return function(text) {
            return $sce.trustAsHtml(text);
        };
};




function postsNavLink() {
  
   var ddo = {
    restrict: 'EA',   
    templateUrl: WPOptions.partials + 'posts-nav-link.html',
    controller: 'PostsNavLinkController as navLink',
    bindToController: true
  };

  return ddo;
  
}


PostsNavLinkController.$inject = ['$element', '$stateParams', 'PostDataService'];
function PostsNavLinkController($element, $stateParams, PostDataService) {
  
    var navLink = this;
    
    navLink.currentPage = ( ! $stateParams.paged ) ? 1 : parseInt( $stateParams.paged );
    navLink.lang = PostDataService.getLanguage();
    navLink.totalPages = PostDataService.totalPages;
    navLink.pagedPath = PostDataService.getBasePagedPath(navLink.lang);
    
    navLink.data = {
                prevLink: navLink.pagedPath + '({paged: ' + (navLink.currentPage - 1) + '})',
                nextLink: navLink.pagedPath + '({paged: ' + (navLink.currentPage + 1) + '})',
                sep: ( ! $element.attr('sep') ) ? '|' : $element.attr('sep'),
                prevLabel: ( ! $element.attr('prev-label') ) ? 'Previous Page' : $element.attr('prev-label'),
                nextLabel: ( ! $element.attr('next-label') ) ? 'Next Page' : $element.attr('next-label')
        };
    
    navLink.init = function(){
       
    };
    
    navLink.init();

    
    navLink.changeLanguage = function(data){
        PostDataService.changeLanguage(data.newLang);
    };
  
}


MainController.$inject = ['posts', 'page', 'PostDataService'];
function MainController(posts, page, PostDataService) {
  
    var main = this;
    
    main.posts = posts;
    
    main.page = page;
    
    main.currentCatalogLink = PostDataService.getCurrentCatalogLink();

    main.lang = PostDataService.getLanguage();
              
    main.postPath = PostDataService.getBasePostPath(main.lang);
    
    main.currentPaged = 1;
    
    main.translatedLink = PostDataService.getTranslatedLink('main', main.currentPaged);
    
    main.totalPages = PostDataService.totalPages;

    main.changeLanguage = function(data){
        PostDataService.changeLanguage(data.newLang);
    };
    
    main.init = function(){

        PostDataService.setSeoData(main.page.page_seo_info.seo_title, main.page.page_seo_info.seo_descriptio);
    };
    
    main.init();
  
}

PagedController.$inject = ['posts', 'page', 'PostDataService'];
function PagedController(posts, page, PostDataService) {
  
    var paged = this;
    
   paged.init = function(){
//        PostDataService.moveWindowUp();
       console.log('PostDataService.getCurrentPaged() ', PostDataService.getCurrentPaged());
       
    };
    
    paged.init();

    paged.posts = posts;
    
    paged.page = page;
    
    paged.currentCatalogLink = PostDataService.getCurrentCatalogLink();

    paged.lang = PostDataService.getLanguage();
       
    paged.postPath = PostDataService.getBasePostPath(paged.lang);
    
    paged.currentPaged = PostDataService.getCurrentPaged();
    
    paged.translatedLink = PostDataService.getTranslatedLink('paged', paged.currentPaged);
    
    paged.totalPages = PostDataService.totalPages;

    paged.changeLanguage = function(data){
        PostDataService.changeLanguage(data.newLang);
    };
  
}

PostContentController.$inject = ['post', 'PostDataService', '$filter'];
function PostContentController(post, PostDataService, $filter) {
  
    var content = this;
        
    content.post = post;

    content.lang = PostDataService.getLanguage(content.post.current_lang);

    content.postPath = PostDataService.getBasePostPath(content.lang);

    content.prevPostExcerpt = false;

    content.nextPostExcerpt = false;
    
    content.catalogPageEN = PostDataService.catalogPageEN;
    
    content.catalogPageDE = PostDataService.catalogPageDE;
    
    content.currentCatalogLink = PostDataService.getCurrentCatalogLink();
        
    content.currentIndex = PostDataService.getCurrentIndex(content.post.id);
    
    content.prevPostID = PostDataService.getPrevPostID(content.currentIndex);
    
    content.nextPostID = PostDataService.getNextPostID(content.currentIndex);

    content.prevPostData = false;
    
    content.nextPostData = false;
    
    content.relatedPaged = false;
    
//    content.postsMap = [];
    
    

    content.changeLanguage = function(data){
        PostDataService.changeLanguage(data.newLang);
        PostDataService.getListIfNotExist(data.newLang, content.relatedPaged);
//        content.getRelatedPagedFromCtrl(content.post.id);
        
    };

    content.showPrevPostExcerpt = function(){
        content.prevPostExcerpt = !content.prevPostExcerpt;
    };
    
    content.showNextPostExcerpt = function(){
        content.nextPostExcerpt = !content.nextPostExcerpt;
    };

   
     
            
    content.getRelatedPagedFromCtrl = function(postID){
       
        var response = false;
        
        response = PostDataService.getRelatedPaged(postID);
        console.log(' getRelatedPagedFromCtrl content.relatedPaged :', response);
        if(response !== false){
            content.relatedPaged =  response; 
            
        }else{
            
            var page = PostDataService.getCurrentPageName();
            console.log(' content.getRelatedPagedFromCtrl getCurrentPageName:', page);
            var promiseObj = PostDataService.getCallForPostsMapBySlug(page);
            
            promiseObj.then(function(data) { 
                    
                    console.log('content.getRelatedPagedFromCtrl data:', data);
                    console.log('content.getRelatedPagedFromCtrl postID:', postID);
                    var index = PostDataService.getIndexFromListByID(data, postID);
                    console.log('getCallForPostsMapBySlug index:', index);
                   
                    
                    if(content.currentIndex === false){
                        content.currentIndex = index;//???????????????????????????????????
                        
                        content.prevPostID = PostDataService.getPrevPostID(content.currentIndex);
                        content.nextPostID = PostDataService.getNextPostID(content.currentIndex);
                        content.getPrevPostInfo(content.prevPostID); 
                        content.getNextPostInfo(content.nextPostID);
                    }
                    
                    var perPage = parseInt(WPOptions.postsPerPage);
                    response = Math.ceil( (index + 1) / perPage);
                    content.relatedPaged = response;
                    
                    
                    //Fill all posts to related paged
                    var promiseObjPosts = PostDataService.getPostsList(content.lang, response);
                    
                    promiseObjPosts.then(function(dataPosts) {  
                        console.log('!!! getCallForPostsMapBySlug dataPosts:', dataPosts);
                        var answer = PostDataService.setCurrentListPosts(dataPosts);
                        console.log('!!! getCallForPostsMapBySlug setCurrentListPosts:', answer);
                    
                    });
               
         
            });
            
            
            
            
        }
    
    };  
    content.getRelatedPagedFromCtrl(content.post.id); 
    
    
    
    content.getPrevPostInfo = function(prevPostID){
        console.log('getPrevPostInfo  Post ID:', prevPostID);
        if(!prevPostID){
            return false;
        }
        var response = false;
        
        response = PostDataService.getPrevPostData(prevPostID);
        
        if(response !== false){
            content.prevPostData =  response;
        }else{
            console.log('getPrevPostInfo call. Post ID:', prevPostID);
            var promiseObj = PostDataService.getPostByID(prevPostID);
            
            promiseObj.then(function(data) { 
                    
                    var response = {
                        "slug": data.slug,
                        "permalink_data":  data.permalink_data,
                        "title": data.title.rendered,
                        "excerpt": data.excerpt.rendered

                    };
                    
                    content.prevPostData = response;
         
            });
        }
    
    };
    
    
    content.getNextPostInfo = function(nextPostID){
        console.log('getNextPostInfo. Post ID:', nextPostID);
        if(!nextPostID){
            return false;
        }
        var response = false;
        
        
        response = PostDataService.getNextPostData(nextPostID);
                
        
        if(response !== false){
            content.nextPostData =  response;
        }else{
            console.log('getNextPostInfo call. Post ID:', nextPostID);
            var promiseObj = PostDataService.getPostByID(nextPostID);
            
            promiseObj.then(function(data) { 
                    
                    var response = {
                        "slug": data.slug,
                        "permalink_data":  data.permalink_data,
                        "title": data.title.rendered,
                        "excerpt": data.excerpt.rendered

                    };
                    
                    content.nextPostData = response;
         
            });
        }
        
            
    
    };
    
    content.getSeoTitle = function(seoTitle){
        var response = false;
        
        if(!seoTitle){
            response = $filter('removeHTMLTags')(content.post.title.rendered);
        }else{
            response = seoTitle;
        }
        
        return response;
    };
    
    content.getSeoDescr = function(seoDescr){
        var response = false;
        
        if(!seoDescr){
            response =  $filter('removeHTMLTags')(content.post.excerpt.rendered);
        }else{
            response = seoDescr;
        }
        
        return response;
    };
    
   
   
   content.init = function(){
       
        var title = content.getSeoTitle(content.post.seo_data.seo_title);
        var descr = content.getSeoDescr(content.post.seo_data.seo_description);
        
        PostDataService.setSeoData(title, descr);
       
        if(content.prevPostID){
            content.getPrevPostInfo(content.prevPostID); 
        }
        
        if(content.nextPostID){
            content.getNextPostInfo(content.nextPostID);
        }
        
    
      console.log('_______________________PREVIOUS POST END__________________');
             
   };
   content.init();

}



;


})();



(function () {
'use strict';

angular.module('data', []);

angular.module('data')
.constant('pageNameEN', "news_test")
.constant('pageNameDE', "neuigkeiten-test")
.constant('prefixEN', "/en")
.constant('prefixDE', "")
.constant('ApiBasePath', "http://promx.webdev.acceptic.com")
.constant('RestPostPath', "/wp-json/wp/v2/posts/")
.constant('RestPagePath', "/wp-json/wp/v2/pages/")
.service('PostDataService', PostDataService);

PostDataService.$inject = ['$q', '$http', 'ApiBasePath', 'RestPostPath', 'RestPagePath', '$filter', 'pageNameEN', 'pageNameDE', 'prefixEN', 'prefixDE'];
    
function PostDataService($q, $http, ApiBasePath, RestPostPath, RestPagePath, $filter, pageNameEN, pageNameDE, prefixEN, prefixDE) {
    var service = this;

    service.catEnglID = 'filter[cat]=' + 475;
    service.catEnglSlug = 'filter[category_name]=' + 'latest-news';
    
    service.catalogPageEN = prefixEN + '/' + pageNameEN + '/';
    service.catalogPageDE = prefixDE + '/' + pageNameDE + '/';
    service.postsListEN = '';
    service.postsListDE = '';
    service.postsMapEN = [];
    service.postsMapDE = [];
    service.lang = false;
    service.postsPerPage = WPOptions.postsPerPage;
    service.catID = 13;
    service.totalPages = 1;
    service.currentPaged = false;
    
    service.pageTitle = 'ProRm';
    
    
    service.setSeoData = function(title, description){
        
        if(!title){
            var title = 'Title ProRM';
        }
        
        if(!description){
            var description = 'Description ProRM'
        }
        
        document.querySelector('title').innerHTML = title + ' | ' + service.pageTitle;
        
        document.getElementsByName('description')[0].content = description;
//        var metaDescr = document.getElementsByName('description')[0].content;
//        if(metaDescr){
//            metaDescr = description;
//        }else{
////            document.querySelector('head').
//        }
//        document.getElementsByName('description')[0].content = description;
        
    };
       
    service.getRelatedPaged = function(postID){
        
        var currentPostsMap = service.getCurrentMap();
        var paged = false;
        console.log('getRelatedPaged works!');
     
        if(currentPostsMap.length > 0 && service.currentPaged !== false){   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            
            var index = service.getIndexFromListByID(currentPostsMap, postID);
            var minIndex = (service.postsPerPage * service.currentPaged) - service.postsPerPage;
            var maxIndex = (service.postsPerPage * service.currentPaged) - 1;
            
            console.log('getRelatedPaged index', index);
             console.log('getRelatedPaged minIndex', minIndex);
             console.log('getRelatedPaged maxIndex', maxIndex);
            
            if(index < minIndex || index > maxIndex){
                console.log('getRelatedPaged index more or less'); //&&&????????????????????????????????
                return false;
            }
            
            paged = service.currentPaged; 
            console.log('currentPaged exists:', paged);
            return paged;

        }
        
        return false;

        
    };
    
    
    service.getTranslatedLink = function(state, paged){
        
       
        console.log('getTranslatedLink paged', paged);
        if(state === 'main' && service.lang === 'de'){
            return 'blog_EN';
        }
        
        else if(state === 'main' && service.lang === 'en'){
            return 'blog_DE';
        }
        
        else if(state === 'paged' && service.lang === 'en'){
            return service.getTranslatedPagedPath(paged);
        }
        
        else if(state === 'paged' && service.lang === 'de'){
            return service.getTranslatedPagedPath(paged);
        }
        
        
        else{
            return service.catalogPageDE;
        }
        
    };
    
    service.getTranslatedPagedPath = function(paged){
        
        if(!paged){
            var paged = 1;
        }
            
        var currentPage = parseInt(paged);
         console.log('getTranslatedPagedPath', currentPage);                       
        if(service.lang === 'en'){
            return service.getBasePagedPath('de') + '({paged: ' + currentPage + '})';       
        }else{
           return service.getBasePagedPath('en') + '({paged: ' + currentPage + '})';
        }
        
    };
    
    service.getCurrentPaged = function(){
        return service.currentPaged;
    };
   
    
    service.moveWindowUp = function(){
//        window.scrollTo(0,0);
    };
    
    service.getCurrentCatalogLink = function () {
           
        if(service.lang === 'en'){
           return service.catalogPageEN;
            
        }else{
           return service.catalogPageDE;
        }
      
    };
    
    
    service.getCurrentListPosts = function () {
       
        var listPosts = false;
       
        if(service.lang === 'en' && service.postsListEN.length > 0){
            listPosts =  service.postsListEN;
            
        }
        else if(service.lang === 'de' && service.postsListDE.length > 0){
            listPosts =  service.postsListDE;
        }
        
        else{
            listPosts =  false;
        }
       

        return listPosts;
        
    };
    
    
    service.setCurrentListPosts = function (data) {
                      
        if(service.lang === 'en'){
            service.postsListEN =  data;
            return true;
            
        }
        else if(service.lang === 'de'){
            service.postsListDE =  data;
            return true;
        }
        else{
            return false;
        }
        
       

        
        
    };
    
    
    service.getNextPostIndex = function (currentIndex) {
        
        var nextIndex = false;
        
        var listPosts = service.getCurrentMap();
        
        if(currentIndex === listPosts.length - 1){
            nextIndex = 0;
        }else{
            nextIndex = currentIndex + 1;
        }
       
        return nextIndex;
        
    };
    
    service.getPrevPostIndex = function (currentIndex) {
        
        var prevIndex = false;
        
        var listPosts = service.getCurrentMap();
        
        if(listPosts.length > 0){
            if(currentIndex === 0){
                prevIndex = listPosts.length - 1;
            }else{
                prevIndex = currentIndex - 1;
            }
        }
       
        return prevIndex;
        
    };
    
    service.getNextPostData = function (nextPostID) {
        
        var response = false;

        var listPosts = service.getCurrentListPosts(); 
        
        var nextPostLocalIndex = service.getIndexFromCurrentListByPostId(listPosts, nextPostID);
        
        if(nextPostLocalIndex !== false){
            console.log('data by nextPostLocalIndex: ', nextPostLocalIndex);
            response = {
                "slug": listPosts[nextPostLocalIndex].slug,
                "permalink_data":  listPosts[nextPostLocalIndex].permalink_data,
                "title": listPosts[nextPostLocalIndex].title.rendered,
                "excerpt": listPosts[nextPostLocalIndex].excerpt.rendered
          
                };
            
        }
        
       return response;
        
    };
    
    service.getPrevPostData = function (prevPostID) {
        
        var response = false;

        var listPosts = service.getCurrentListPosts(); 
        
        var prevPostLocalIndex = service.getIndexFromCurrentListByPostId(listPosts, prevPostID);
        
        if(prevPostLocalIndex !== false){
            console.log('data by prevPostLocalIndex: ', prevPostLocalIndex);
            response = {
                "slug": listPosts[prevPostLocalIndex].slug,
                "permalink_data":  listPosts[prevPostLocalIndex].permalink_data,
                "title": listPosts[prevPostLocalIndex].title.rendered,
                "excerpt": listPosts[prevPostLocalIndex].excerpt.rendered
          
                };
            
        }
        
       return response;
        
    };
    
    
    
    
    service.getPrevPostID = function (currentIndex) {
        
        var prevPostID = false;
        
        var prevPostIndex = service.getPrevPostIndex(currentIndex);
        
        var map = service.getCurrentMap();
        
        console.log('prevPostIndex: ', prevPostIndex);
        
        if(!map){
            return false;
        }
        
        prevPostID = parseInt(map[prevPostIndex]);
        
        if(prevPostID){
            return prevPostID;
        }
        
        return prevPostID;
        
    };
    
    service.getNextPostID = function (currentIndex) {
        
        var nextPostID = false;
        
        var nextPostIndex = service.getNextPostIndex(currentIndex);
        
        var map = service.getCurrentMap();
        
        console.log('nextPostIndex: ', nextPostIndex);
        
        if(!map){
            return false;
        }
        
        nextPostID = parseInt(map[nextPostIndex]);
        
        if(nextPostID){
            return nextPostID;
        }
        
        return nextPostID;
        
    };
    
    
    
    
    service.getListIfNotExist = function (lang, paged) {
        
        
        if(lang === 'en' && service.postsListEN === ''){
            service.getPostsList('en', paged);
            
        }
        else if(lang === 'de' && service.postsListDE === ''){
            service.getPostsList('de', paged);
        }
        else{
            return;
        }
        
        
        
    };
    
    service.getCurrentIndex = function (postID) {
        var ID =  parseInt(postID);
        var index = false;
        var listPosts = service.getCurrentMap();
        
        if(!listPosts){
            console.log('listPosts from getCurrentIndex: ', listPosts);
        }
        
        if(listPosts){
            index = service.getIndexFromListByID(listPosts, ID);
        }
        
        console.log('Index from getCurrentIndex: ', index);
        
        if(index === ''){
            return false;
        }
        
        return index;
        

    };
    
    service.getCurrentMap = function () {
       
        var mapPosts = false;
       
        if(service.lang === 'en' && service.postsMapEN.length > 0){
            mapPosts =  service.postsMapEN;
            
        }else if(service.lang === 'de' && service.postsMapDE.length > 0){
            mapPosts =  service.postsMapDE;
        }
//       console.log('mapPosts: ', mapPosts);

        return mapPosts;
        
    };
    
    service.getCurrentPageName = function () {
       
        if(service.lang === 'en'){
            return pageNameEN;
            
        }else if(service.lang === 'de'){
            return pageNameDE;
        }

        return false;
        
    };
    
    
    
    service.getIndexFromCurrentListByPostId = function(data, postID){
      
        for (var i = 0; i < data.length; i++) {

            if(data[i].id === postID){
                return i;
            }
        }
        return false;
    };
    
    service.getIndexFromListByID = function(data, postID){
      
        for (var i = 0; i < data.length; i++) {

            if(data[i] === postID){
                return i;
            }
        }
        return false;
    };
    
    
    service.getIndexFromListBySlug = function(data, slug){
      
        for (var i = 0; i < data.length; i++) {

            if(data[i].slug === slug){
                return i;
            } 
        }
        return false;
    };
    
    
    service.changeLanguage = function (newLang) {
        service.lang = newLang;
    };
    
    service.getBasePostPath = function(lang){
      
        if(lang === 'en'){
            return 'post_EN';
        }
        else{
            return 'post_DE';
        }
      
    };
    
    
    service.getBasePagedPath = function(lang){
      
        if(lang === 'en'){
            return 'paged_EN';
        }
        else{
            return 'paged_DE';
        }
      
    };
    
    service.getLanguage = function (newLang) {
        
        if(service.lang === false && newLang){
            service.lang = newLang;
            
        }
        
        return service.lang;
    };

    // Returns a promise, NOT items array directly
    service.getPostsList = function (lang, page) {
        
        if(!page){
            var page = 1;
        }
        
        var currentPage = parseInt(page);
        service.currentPaged = currentPage;
        
        if(lang === 'en'){
            service.lang = 'en';
            service.catID = 475;
            
//            if(service.postsListEN.length > 0){
//                return service.postsListEN; 
//            }
            
        }else{
            service.lang = 'de';
            service.catID = 13;
            
//            if(service.postsListDE.length > 0){
//                return service.postsListDE;
//            }
        }
        
        var deferred = $q.defer();

        $http({
            method: 'GET', 
            url: (ApiBasePath + RestPostPath + "?filter[posts_per_page]=" + service.postsPerPage + '&' + 'filter[cat]=' + service.catID + '&' + 'page=' + currentPage)
        })
        .success(function(data, status, headers, config) {
            
            //document.querySelector('title').innerHTML = 'Catalog | ' + service.pageTitle;
            
            if(lang === 'en'){
                service.postsListEN = data;
            }else{
                service.postsListDE = data;
            }
            
            service.totalPages = headers('X-WP-TotalPages');

            deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
            
            console.log('error: ', status);
            deferred.reject(status);
            
        });

        return deferred.promise;

    };
    
    
    // Returns a promise, NOT items array directly
    service.getPost = function (slug) {
        console.log('getPost() works! ');
        var listPosts = service.getCurrentListPosts();
        
        var index = service.getIndexFromListBySlug(listPosts, slug);
//       
        if(listPosts[index]){
            console.log('no http. Posts data from catalog!');
//            console.log('listPosts[index]: ', listPosts[index]);
            return listPosts[index];
        }           
        
        
        var deferred = $q.defer();

        $http({
            method: 'GET', 
            url: (ApiBasePath + RestPostPath + "?filter[name]=" + slug)
        })
        .success(function(data, status, headers, config) {
//            document.querySelector('title').innerHTML = data[0].title.rendered + ' | ' + service.pageTitle;
            console.log('post data from http: ', data[0]);
            deferred.resolve(data[0]);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(status);
        });


        return deferred.promise;

    };
    
    service.getPostByID = function (postID) {
        console.log('getPostByID() works! ');

        var deferred = $q.defer();
//
        $http({
            method: 'GET', 
            url: (ApiBasePath + RestPostPath + postID)
        })
        .success(function(data, status, headers, config) {
            console.log('getPostByID data from http: ', data);
            deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(status);
        });
              
     
        return deferred.promise;


    };
    
     // Returns a promise, NOT items array directly
    service.getPageBySlug = function (slug) {
        
//        if(listPosts[index]){
//            console.log('no http. Posts data from catalog!');
//            
//                return listPosts[index];
//        }           
        
        
        var deferred = $q.defer();

        $http({
            method: 'GET', 
            url: (ApiBasePath + RestPagePath + "?filter[name]=" + slug)
        })
        .success(function(data, status, headers, config) {
            
            console.log('page data from http: ', data[0]);
            
            if(service.lang === 'en'){
                service.postsMapEN = data[0].cat_posts_ids;
                
            }else{
                service.postsMapDE = data[0].cat_posts_ids;
                
            }
            deferred.resolve(data[0]);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(status);
        });


        return deferred.promise;

    };
    
    
     // Returns a promise, NOT items array directly
    service.getCallForPostsMapBySlug = function (slug) {
  
        var deferred = $q.defer();

        $http({
            method: 'GET', 
            url: (ApiBasePath + RestPagePath + "?filter[name]=" + slug)
        })
        .success(function(data, status, headers, config) {
            
            console.log('initPostsMap from http: ', data[0]);
            
            if(service.lang === 'en'){
                service.postsMapEN = data[0].cat_posts_ids;
                
            }else{
                service.postsMapDE = data[0].cat_posts_ids;
                
            }
            deferred.resolve(data[0].cat_posts_ids);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(status);
        });


        return deferred.promise;

    };
   
}



})();
