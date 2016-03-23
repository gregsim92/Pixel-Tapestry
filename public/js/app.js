var app = angular.module('pixelApp', ['angularMoment','ngRoute','colorpicker.module']);

app.config(function($routeProvider,$locationProvider,$httpProvider){

	$routeProvider
		.when('/', {
			templateUrl:'/pages/index.html',
			controller:'homeController'
		})
		.when('/tapestry', {
			templateUrl:'/pages/canvas.html',
			controller:'tapestryController'
		})
		.otherwise({ redirectTo: '/' });


	$httpProvider.interceptors.push('authInterceptor');

})