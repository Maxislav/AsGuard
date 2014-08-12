angular.module('phonecatAnimations', ['ngAnimate'])
var phonecatApp = angular.module('phonecatApp', [
    'ngRoute',
    'navControllers',
    'phonecatAnimations'
]);


phonecatApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'partials/instruction/home.html',
                controller: 'home'
            }).
            when('/adddevice', {
                templateUrl: 'partials/instruction/adddevice.html',
                controller: 'adddevice'
            }).
            when('/gpslogger', {
                templateUrl: 'partials/instruction/gpslogger.html',
                controller: 'gpslogger'
            }).
            when('/okoavto', {
                templateUrl: 'partials/instruction/okoavto.html',
                controller: 'okoavto'
            }).
        when('/gpsmarker', {
            templateUrl: 'partials/instruction/gpsmarker.html',
            controller: 'gpsmarker'
        }).
            otherwise({
                redirectTo: '/home'
            });
    }]);


//angular.module('gpslogger', ['ngAnimate'])

var navControllers = angular.module('navControllers', [ ])

navControllers.controller('home', function ($scope, $http, $routeParams, $rootScope) {
   $scope.activEl('#home', $scope)

})

navControllers.controller('gpslogger', function ($scope, $http, $routeParams, $rootScope) {
    $scope.activEl('#gpslogger', $scope)
})

navControllers.controller('okoavto', function ($scope, $http, $routeParams, $rootScope) {
    $scope.activEl('#okoavto', $scope)
})

navControllers.controller('adddevice', function ($scope, $http, $routeParams, $rootScope) {
    $scope.activEl('#adddevice', $scope)
})


navControllers.controller('gpsmarker', function ($scope, $http, $routeParams, $rootScope) {
    $scope.activEl('#gpsmarker', $scope)
})


phonecatApp
    .controller('nav', function ($scope) {
        $scope.getEl = function (el) {
            // console.log(el)
        }
    })
    .directive('h', function () {
        return function ($scope, element, attrs) {
            $scope.els[element[0].hash] = element
            console.log(element)
        }
    })
    .run(function ($rootScope, $location) {
        $rootScope.els = {};
        $rootScope.activEl = function (name, s) {
            for (var opt in s.els) {
                if (s.els[opt][0].hash == name) {
                    s.els[opt].addClass('select')
                } else {
                    s.els[opt].removeClass('select')
                }
            }
        }
    })
