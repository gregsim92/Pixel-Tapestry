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
			this.canvas.setWidth(600);
			this.canvas.setHeight(450);

			var grid = 25;

			for (var i = 0; i < 600 / grid; i++){
				for (var j = 0; j < 450 / grid; j++){
					this.canvas.add(new fabric.Rect({
						left: i * grid,
						top: j * grid,
						width: grid,
						height: grid,
						fill: '#cccccc',
						lockMovementX: true,
						lockMovementY: true,					
						lockScalingX: true,
						lockScalingY: true,
						lockRotation: true
					}))
				}
			}
		},
		loadBoard: function(){
			var data = '{"objects":[{"type":"rect","originX":"left","originY":"top","left":50,"top":50,"width":20,"height":20,"fill":"green","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0}],"background":""}'
			var canvasHolder = this.canvas;

			this.canvas.loadFromJSON(data,this.canvas.renderAll.bind(this.canvas), function(o,object){
				fabric.log(o, object)
				console.log(canvasHolder);
				console.log('Green ' + JSON.stringify(o));
				console.log('Object: ' + JSON.stringify(object));
			})
		},
		saveBoard: function(){
			var canvasHolder = this.canvas;
			var x = JSON.stringify(canvasHolder);

			return x;

		},
		finalBoard: function(data){
			var canvasHolder = this.canvas;
			var x = data;

			canvasHolder.loadFromJSON(x,canvasHolder.renderAll.bind(canvasHolder), function(o,object){
				fabric.log(o,object);

			})
		}
	}
})