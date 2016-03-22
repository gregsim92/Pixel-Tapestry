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

			var grid = 50;

			for (var i = 0; i < 500 / grid; i++){
				for (var j = 0; j < 500 / grid; j++){
					var newRext = new fabric.Rect({
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
					})
					newRext.on('selected', function(){
						console.log(newRext)
						console.log(this, "SHOW ME THIS")
						this.fill = 'red'

					})
					this.canvas.add(newRext);
				
				}
			}
					this.canvas.on('mouse:up', function(){
						index.renderAll.bind(index)
						console.log('redraw')
					})
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
			var x = JSON.stringify(canvasHolder.toDatalessJSON());

			console.log(x)
			return x;

		},
		finalBoard: function(data){
			var canvasHolder = this.canvas;
			var x = data;

			canvasHolder.loadFromJSON(x,canvasHolder.renderAll.bind(canvasHolder), function(o,object){
				fabric.log(o,object);

			})
		},
		changeColor: function(){
			
		}
	}
})