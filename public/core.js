var myTodo = angular.module('myTodo',[]);

function mainController($scope,$http){
	$scope.formData = {};
	
	//Get all todos on Main Page
	$http.get('/api/todos').success(function(data){
		$scope.todos = data;
		console.log(data);
	}).error(function(data){
		console.log('Error: '+ data);
	});
	
	//Sent text to API on submit
	$scope.createTodo = function(){
		$http.post('/api/todos',$scope.formData).success(function(data){
			$scope.formData = {};
			$scope.todos = data;
			console.log(data);
		}).error(function(data){
				console.log('Error:'+data);
			
		});
	};
	 // delete a todo onCheck
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}