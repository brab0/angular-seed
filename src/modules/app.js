(function(){
   angular.module('AppSeed')
   .controller('MainCtrl', [
      '$scope',
      '$rootScope',
      '$mdSidenav',
      function(
         $scope,
         $rootScope,
         $mdSidenav) {

         $rootScope.pageTitle = '';
         $rootScope.pageSubtitle = '';

         $scope.toggleSidebar = function(){
            $mdSidenav('left').toggle();
         }
      }
   ]);
})();
