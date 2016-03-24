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

	$scope.createTapestry = createTapestry;

	createTapestry.createBoard();

	$scope.saveBoard = function(){

		$scope.tapData = createTapestry.saveBoard()

		$http({
			method:'POST',
			url:'/savetapestry',
			data:$scope.tapData
		}).then(function(){
			console.log('fingers Crossed!')
		}).catch(function(err){
			console.log('bOOOOOOOOO')
			console.log(err)
		})
	}

	$scope.retrieve = function(){
		$http({
			method:'GET',
			url:'/savetapestry'
		}).then(function(data){
			createTapestry.loadBoard(data.data.canvas_data);
		}).catch(function(err){
			console.log('BAAAAD')
			console.log(err)
		})
	}

	$scope.upload = function(){
		$http({
			// headers:{
			// 		 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
			method:'POST',
			url:'https://api.cloudinary.com/v1_1/dge7wytnb/image/upload',
			data: {
				upload_preset:'p4i2xlnf',	
				file:createTapestry.getImgURL(),
			}
		}).then(function(data){
			
		}).catch(function(err){
			console.log('failed')
			console.log(err)
		})
	}

}])
