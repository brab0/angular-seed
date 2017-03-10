(function(){
   angular.module('AppSeed', [
      'ui.router',
      'ngMaterial',
      'ngSanitize'
   ])
   .config([
      '$httpProvider',
      '$locationProvider',
      '$mdThemingProvider',
      function(
         $httpProvider,
         $locationProvider,
         $mdThemingProvider) {

         $httpProvider.defaults.useXDomain = true;

         delete $httpProvider.defaults.headers.common['X-Requested-With'];

         $mdThemingProvider.theme('default')
         .primaryPalette('teal')
         .accentPalette('orange');

      }
   ])
   .constant("settings", {
      api: "http://localhost:8080"
   });
})();
