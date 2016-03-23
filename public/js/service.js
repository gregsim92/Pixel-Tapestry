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
		// private canvas warpper
		canvas: null,

		createBoard: function(){
		    this.canvas = new fabric.Canvas('Tapestry')

			var index = this.canvas

			index.setWidth(500);
			index.setHeight(500);

			var grid = 25;

			for (var i = 0; i < 500 / grid; i++){
				for (var j = 0; j < 500 / grid; j++){
					var newRext = new fabric.Rect({
						left: i * grid,
						top: j * grid,
						width: grid,
						height: grid,
						fill: '#cccccc',
						hasControls: false,
						hasBorders: false,
						lockMovementX: true,
						lockMovementY: true,					
						lockScalingX: true,
						lockScalingY: true,
						lockRotation: true
					})
					newRext.on('selected', function(){
						this.fill = 'red'
						console.log(this)

					})
					this.canvas.add(newRext);
				
				}
			}
					this.canvas.on('mouse:up', function(){
						index.renderAll.bind(index)
						console.log('redraw')
					})
		},
		loadBoard: function(data){
			var canvasHolder = this.canvas;

			this.canvas.loadFromJSON(data,canvasHolder.renderAll.bind(canvasHolder))
			var objects = canvasHolder.getObjects()

			for(key in objects) {
				objects[key].on('selected', function(){
					this.fill = 'green';
					this.hasControls = false;
					this.hasBorders = false;
					this.lockMovementX = true;
					this.lockMovementY = true;					
					this.lockScalingX = true;
					this.lockScalingY = true;
					this.lockRotation = true;
				})
			}
		},
		saveBoard: function(){
			var canvasHolder = this.canvas;
			var x = JSON.stringify(canvasHolder.toDatalessJSON());

			return x;

		},
		changeColor: function(){
			
		}
	}
})