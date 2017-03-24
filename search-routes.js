myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/search');

    $stateProvider

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



