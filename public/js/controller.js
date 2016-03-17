app.controller('homeController',['$scope','$http', 
						 function($scope,  $http){

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
				localStorage.setItem('jwt',data.data.jwt);
			}).catch(function(err){
				console.log(err)
			});
		}

		$scope.logout = function() {
			localStorage.removeItem('jwt');
	}
		
}]);

app.controller('canvasController', ['$scope', '$http', ])