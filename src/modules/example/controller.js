(function(){
   angular.module('AppSeed')
   .controller('ExampleCtrl', [
      '$scope',
      '$rootScope',
      '$http',
      'settings',
      function(
         $scope,
         $rootScope,
         settings) {

            $rootScope.pageTitle = 'Example';
            $rootScope.pageSubtitle = 'Welcome';

         }
      ]
   );
})();
