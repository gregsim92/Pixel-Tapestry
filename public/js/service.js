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
			var canvas = new fabric.Canvas('Tapestry')
			canvas.setWidth(800);
			canvas.setHeight(500);

		},
		loadBoard: function(){
			var canvas = new fabric.Canvas('Tapestry')
			var data = '{"objects":[{"type":"rect","originX":"left","originY":"top","left":50,"top":50,"width":20,"height":20,"fill":"green","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0}],"background":""}'

			canvas.loadFromJSON(data,canvas.renderAll.bind(canvas), function(o,object){
				fabric.log(o, object)
			})
		}
	}
})