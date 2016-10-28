angular.module('myApp')
    .controller('GoalsCtrl',[ '$state', '$rootScope', 'toastr', '$scope', 'dataservice','$http', function($state,$rootScope,$toastr,$scope,dataservice,$http) {
        var vm = this;
        vm.goal = {};
        vm.goals = [];
        vm.saveGoal = saveGoal;
        vm.fields = [
            { name: 'name',type:'text',label:'Goal',placeholder: 'Type your goal'},
            { name: 'description',type:'textarea',label:'Description',placeholder: 'Describe your goal',
                hint: 'Provide more details about the goal and how you intend to achieve it.'}
        ];

        function saveGoal(){
            dataservice.addModel('goal',vm.goal).then(function(newGoal){
                if (typeof newGoal.error != 'undefined') $toastr.error(newGoal.error,'Error saving goal');
                else vm.goals = vm.goals.concat([ newGoal] );
            });
        }

        function initialize(){
            // goals
            dataservice.getModels('goal',[]).then(function(models){ vm.goals = models;});
        }

        initialize();

    }]);