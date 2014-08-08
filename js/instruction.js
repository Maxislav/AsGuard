angular.module('phonecatAnimations', ['ngAnimate'])
var phonecatApp = angular.module('phonecatApp', [
	'ngRoute',
	'navControllers',
	'phonecatAnimations'
]);



phonecatApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/gpslogger', {
				templateUrl: 'partials/instruction/gpslogger.html',
				controller: 'gpslogger'
			}).
			when('/okoavto', {
				templateUrl: 'partials/instruction/okoavto.html',
				controller: 'okoavto'
			})
			/*otherwise({
				redirectTo: '/gpslogger'
			});*/
	}]);



//angular.module('gpslogger', ['ngAnimate'])

var navControllers = angular.module('navControllers', [ ])


navControllers.controller('gpslogger', function ($scope, $http, $routeParams, $rootScope ) {

})

navControllers.controller('okoavto', function ($scope, $http, $routeParams, $rootScope ) {

})