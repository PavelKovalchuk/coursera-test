(function () {

angular.module('public')
.filter('priceFilter', priceFilter);

function priceFilter() {
  return function (data, min, max) {
      
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }  
    
    min = parseFloat(min);
    max = parseFloat(max);
    
    if (!isNumeric(min) || !isNumeric(max)){
             return;
        }

    var result = [];

    for (var i = 0; i < data.length; i++) {
        var price = data[i].price_large;

        if (!isNumeric(price)){
             return;
        }

        if ( price >= min && price <= max) {
           result.push(data[i]);
        }
    }

    return result;
    
  };
}

})();
