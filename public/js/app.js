var app = angular.module('pixelApp', ['angularMoment','ngRoute']);

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