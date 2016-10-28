angular.module('myApp')
    .controller('GoalsCtrl',[ '$state', '$rootScope', 'toastr', '$scope', 'dataservice','$http', function($state,$rootScope,$toastr,$scope,dataservice,$http) {
        var vm = this;
        vm.goals = [];
    }]);