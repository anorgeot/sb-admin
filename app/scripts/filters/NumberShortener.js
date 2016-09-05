/**
 * Created by piotr.grzegorzewski on 18/04/2016.
 */
angular
    .module('sbAdminApp')
    .filter('NumberShortener', function() {
        return function(input, precision) {
            if ( input===undefined || input === null ) return input;
            var number = parseFloat(input);
            var postfix = "";
            if ( precision===undefined || isNaN(precision) ) precision = 0;
            if ( number > 1000000 ) {
                number = number / 1000000;
                postfix = "M";
            } else if ( number > 1000 ) {
                number = number / 1000;
                postfix = "k";
            }
            return input;
            //return (Math.round(number*Math.pow(10,precision))/Math.pow(10,precision))+postfix;
            //return number+postfix;
        }
    });