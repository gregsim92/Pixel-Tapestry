app.controller('homeController',['$scope','$http', '$location', 'createTapestry',
						 function($scope,  $http,   $location,   createTapestry){

		$scope.picDemo = {}

		$http({
			method:'GET',
			url:'/loadtapestry'
		}).then(function(data){

		$scope.pics = data.data
	})


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

	$scope.pushToDB = function(){

		$scope.tapData.canvas = createTapestry.saveBoard()
		$scope.tapData.name = $scope.currentBoard.name;

		$http({
			method:'POST',
			url:'/savetapestry',
			data:$scope.tapData
		}).then(function(){
			console.log($scope.tapData)
			$scope.pics.push($scope.tapData)
		}).catch(function(err){
			console.log('bOOOOOOOOO')
			console.log(err)
		})
	}

	$scope.retrieve = function(pic){
		$http({
			method:'POST',
			url:'/gettapestry',
			data: {
				id: pic.id
			}
		}).then(function(data){
			$scope.currentBoard = data.data;
			createTapestry.loadBoard(data.data.canvas_data);
		}).catch(function(err){
			console.log('BAAAAD')
			console.log(err)
		})
	}

	$scope.save = function(){
		$http({
			method:'POST',
			url:'https://api.cloudinary.com/v1_1/dge7wytnb/image/upload',
			data: {
				upload_preset:'p4i2xlnf',	
				file:createTapestry.getImgURL(),
			}
		}).then(function(data){
			$scope.tapData.img_url = data.data.secure_url
			debugger;
			$scope.pushToDB()
		}).catch(function(err){
			console.log('failed')
			console.log(err)
		})
	}

	$scope.favoriteBoard = function(){
		$http({
			method:'POST',
			url:'/favorite',
			data:$scope.tapData
		}).then(function(data){
			console.log(data)
		})
	}

}])
