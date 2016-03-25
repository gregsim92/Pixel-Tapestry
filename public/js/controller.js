app.controller('homeController',['$scope','$http', '$location',
						 function($scope,  $http,   $location){
		// $scope.user = {
		// 	email : decoded.email
		// }

		$scope.toCanvas = function(){
			$location.path('/tapestry')
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
	$scope.pics = {};
	$scope.currentBoard = {};
	$scope.tapData = {};

	$http({
		method:'GET',
		url:'/loadtapestry'
	}).then(function(data){

		$scope.pics = data.data
	})

	$scope.save = function(){

		$scope.tapData.canvas = createTapestry.saveBoard()

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
			$scope.currentBoard = data.data
			createTapestry.loadBoard(data.data.canvas_data);
		}).catch(function(err){
			console.log('BAAAAD')
			console.log(err)
		})
	}

	$scope.upload = function(){
		$http({
			method:'POST',
			url:'https://api.cloudinary.com/v1_1/dge7wytnb/image/upload',
			data: {
				upload_preset:'p4i2xlnf',	
				file:createTapestry.getImgURL(),
			}
		}).then(function(data){
			$scope.tapData.imgURL = data.data.secure_url
			$scope.save()
		}).catch(function(err){
			console.log('failed')
			console.log(err)
		})
	}

	$scope.favoriteBoard = function(){
		$http({
			method:'POST',
			url:'/favorite',
			data:$scope.currentBoard
		}).then(function(data){
			console.log(data)
		})
	}


}])
