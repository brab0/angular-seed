(function(){
    angular.module('AppSeed')
        .directive('sidebar',
            function() {
                return {
                    restrict: 'E',
                    templateUrl: 'src/directives/sidebar/view.html'
                };
            }
        );
})();
