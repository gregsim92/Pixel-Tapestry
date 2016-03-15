var app = angular.module('pixelApp', ['angularMoment','ngRoute']);

app.config(function($routeProvider,$locationProvider,$httpProvider){

	$routeProvider
		.when('/', {
			templateUrl:'pages/index',
			controller:'homeController'
		})

	$
})