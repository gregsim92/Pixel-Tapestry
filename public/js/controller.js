app.controller('homeController',['$scope','$http', 
						 function($scope,  $http){
		$scope.user = {
			email : decoded.email
		}

		$scope.signup = function(){
			$http({
				method:'POST',
				url:'/new',
				data:$scope.signUp
			}).then(function(data){
				//set up the JWT for first time user
				localStorage.setItem('jwt', data.data.jwt);
			}).catch(function(err){
				console.log(err)
			});
		}

		$scope.login = function(){
			$http({
				method:'POST',
				url:'/login',
				data:$scope.logIn
			}).then(function(data){
				debugger
				localStorage.setItem('jwt',data.data.jwt);
			}).catch(function(err){
				console.log(err)
			});
		}

		$scope.logout = function() {
			localStorage.removeItem('jwt');
	}
		
}]);

app.controller('tapestryController', ['$scope','$http', 'createTapestry', 
							  function($scope,  $http,   createTapestry){

	$scope.test = 'Hello'
	$scope.board = createTapestry.createBoard();

	$scope.setBoard = function(){
		createTapestry.loadBoard()
	}
}])






