app.controller('homeController',['$scope','$http', 
						 function($scope,  $http){

		$scope.signup = function(){
			debugger;
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

		
}]);