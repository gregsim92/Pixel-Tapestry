app.service('authInterceptor', function($window,$location,$q){
	return {
		request: function(config){
			var token = localStorage.getItem('jwt');

			if(token) config.headers.Authorization = 'Bearer ' + token
				console.log(config)
			return config;
		}
	}
})

app.service('createTapestry', function(){
	return {
		createBoard: function(){
			this.canvas = document.getElementById('Tapestry');
			this.canvas.height = 500;
			this.canvas.width = 500;
			this.ctx = this.canvas.getContext('2d');
			this.canvas.background = #1c1949;
		}
	}
})