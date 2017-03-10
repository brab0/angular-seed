(function(){
   angular.module('AppSeed')
   .config([
      '$stateProvider',
      '$urlRouterProvider',
      function(
         $stateProvider,
         $urlRouterProvider) {

         $urlRouterProvider.otherwise('/example');

         $stateProvider
         .state('app', {
            url: '/',
            views: {
               'app': {
                  templateUrl: 'src/template/app.html',
                  controller : 'MainCtrl'
               },
               'sidebar@app': {
                  templateUrl: 'src/template/parts/sidebar.html'
               },
               'main@app': {
                  templateUrl: 'src/template/parts/main-content.html'
               }
            }
         })
         .state('app.example', {
            url: 'example',
            views: {
               'content': {
                  controller : 'ExampleCtrl',
                  templateUrl: 'src/modules/example/view.html'
               }
            }
         });
      }
   ]);
})();
