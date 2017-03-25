myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'pages/home.html',
        })
        .state('search', {
            url: '/search',
            templateUrl: 'pages/search.html',
            controller: 'searchCtrl'
        })
        .state('id', {
            url: '/id',
            templateUrl: 'pages/id.html',
            controller: 'idCtrl'
        })
});



