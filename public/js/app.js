var app = angular.module('pixelApp', ['angularMoment','ngRoute']);

app.config(function($routeProvider,$locationProvider,$httpProvider){

	$routeProvider
		.when('/', {
			templateUrl:'/pages/index.html',
			controller:'homeController'
		})

	$locationProvider.html5Mode(true);

	$httpProvider.interceptors.push('authInterceptor');

})