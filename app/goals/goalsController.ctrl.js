angular.module('myApp')
    .controller('GoalsCtrl',[ 'arraysManager', '$state', '$rootScope', 'toastr', '$scope', 'dataservice','$http', function(arraysManager,$state,$rootScope,$toastr,$scope,dataservice,$http) {
        var vm = this;
        vm.goal = {};
        vm.goals = [];
        vm.saveGoal = saveGoal;
        vm.blurField = blurField;
        vm.deleteGoal = deleteGoal;
        vm.fields = [
            { name: 'name',type:'text',label:'Goal',placeholder: 'Type your goal'},
            { name: 'description',type:'textarea',label:'Description',placeholder: 'Describe your goal',
                hint: 'Provide more details about the goal and how you intend to achieve it.'},
            { name: 'due_date', type: 'date', label: 'Due Date', placeholder: 'Optional due date'}
        ];

        function deleteGoal( objGoal ){
            dataservice.deleteModel('goal',objGoal.goal_id).then(function(deletedGoal){
                if ( typeof deletedGoal.error =='undefined')
                    vm.goals = arraysManager.removeElementByValue(vm.goals,'goal_id',objGoal.goal_id);
            })
        }
        function blurField( objField ){
            console.log( objField);
        }

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