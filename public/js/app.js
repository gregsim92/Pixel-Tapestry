var app = angular.module('pixelApp', ['ngRoute','colorpicker.module','cloudinary']);

app.config(function($routeProvider,$locationProvider,$httpProvider,cloudinaryProvider){

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

	cloudinaryProvider
		.set("cloud_name, 'dge7wytnb'")


	$httpProvider.interceptors.push('authInterceptor');

})