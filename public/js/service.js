app.service('authInterceptor', function($window,$location,$q){
	return {
		request: function(config){
			var token = localStorage.getItem('jwt');

			if(token && config.url.indexOf('https://api.cloudinary.com/v1_1/dge7wytnb')===-1)
			 {config.headers.Authorization = 'Bearer ' + token
				console.log(config)
			}
			return config;
		}
	}
})



app.service('createTapestry', function(){
	return {
		color:'#cccccc',
		canvas: null,

		createBoard: function(){
		    var that = this

		    this.canvas = new fabric.Canvas('Tapestry')
		    var ctx = this.canvas.getContext();

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
						fill: that.color,
						hasControls: false,
						hasBorders: false,
						lockMovementX: true,
						lockMovementY: true,					
						lockScalingX: true,
						lockScalingY: true,
						lockRotation: true
					})
					newRext.on('selected', function(){
						this.fill = that.color

					})
					this.canvas.add(newRext);
				
				}
			}
					this.canvas.on('mouse:up', function(){
						index.renderAll.bind(index)
					})
		},
		loadBoard: function(data){
			var that = this;
			var canvasHolder = this.canvas;

			canvasHolder.loadFromJSON(data,canvasHolder.renderAll.bind(canvasHolder))
			var objects = canvasHolder.getObjects()

			for(key in objects) {
				objects[key].on('selected', function(){
					this.fill = that.color;
					this.hasControls = false;
					this.hasBorders = false;
					this.lockMovementX = true;
					this.lockMovementY = true;					
					this.lockScalingX = true;
					this.lockScalingY = true;
					this.lockRotation = true;
				})
				objects[key].on('modified', function(){
					canvasHolder.modified = true;
				})
			}
		},
		saveBoard: function(){
			var canvasHolder = this.canvas;
			var x = JSON.stringify(canvasHolder.toDatalessJSON());

			return x;

		},
		getImgURL: function(){
			return this.canvas.toDataURL()
		}

	}
})