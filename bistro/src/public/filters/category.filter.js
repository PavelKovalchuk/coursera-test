(function () {

angular.module('public')
.filter('categoryFilter', categoryFilter);

function categoryFilter() {
  return function (data, cat_short_name) {
      
//    console.log(data);
    //console.log(cat_short_name);
    
    var result = [];
    
//    result = $filter('filter')(data, {short_name: cat_short_name})

    for (var i = 0; i < data.length; i++) {
        var itemsCat = data[i].short_name;
//        console.log(cat);
        var itemsCatCleaned = itemsCat.replace(/[0-9]/g, '');
//        console.log(c);
        if ( itemsCatCleaned === cat_short_name) {
           result.push(data[i]);
        }
    }

    return result;
    
  };
}

})();
