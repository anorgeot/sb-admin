angular.module("sbAdminApp").filter("NumberShortener",function(){return function(input,precision){if(void 0===input||null===input)return input;var number=parseFloat(input),postfix="";return(void 0===precision||isNaN(precision))&&(precision=0),number>1e6?(number/=1e6,postfix="M"):number>1e3&&(number/=1e3,postfix="k"),input}});