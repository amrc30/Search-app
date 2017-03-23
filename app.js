myApp.config(function ($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/search');
    
    $stateProvider

    .state('search', {
        url:'/search',
        templateUrl: 'pages/search.html',
        controller: 'searchCtrl'
    })
    .state('detail', {
        url:'/detail',
        templateUrl: 'pages/detail.html',
        controller: 'detailCtrl'
    }) 
});

myApp.service('PagerService', function PagerService() {
    // service definition
    var service = {};
 
    service.GetPager = GetPager;
 
    return service;
 
    // service implementation
    function GetPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
 
        // default page size is 10
        pageSize = pageSize;
 
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
 
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
})

myApp.controller('searchCtrl', ['$scope','$http', 'PagerService', function ($scope, $http, PagerService) {
   
	$scope.searchString = '';

    $scope.pager = {};
    $scope.pager.pageSize = 10;
    
   
 
   	$scope.pager.currentPage = 1;
	$scope.$watchGroup(['searchString', 'pager.currentPage'], function (newVal, oldVal) {
	if (oldVal !== newVal){
	var myUrl = 'http://www.omdbapi.com/?s=' + $scope.searchString + '&page=' + $scope.pager.currentPage;
	$http({
  method: 'GET',
  url: myUrl
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  
    $scope.data = response.data;
    $scope.dataRange = _.range(1, $scope.data.totalResults);
    $scope.setPage = function (page) {
    $scope.pager = PagerService.GetPager($scope.data.totalResults, page);
  }
  $scope.pager.totalPages = Math.ceil($scope.data.totalResults / $scope.pager.pageSize);
})
}
    })
 var startPage, endPage;
        if ( $scope.pager.totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage =  $scope.pager.totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if ($scope.pager.currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if ($scope.pager.currentPage + 4 >=  $scope.pager.totalPages) {
                startPage =  $scope.pager.totalPages - 9;
                endPage =  $scope.pager.totalPages;
            } else {
                startPage = $scope.pager.currentPage - 5;
                endPage = $scope.pager.currentPage + 4;
            }
        }
    $scope.pager.pages = _.range(startPage, endPage);
}]);
myApp.controller('forecastCtrl', ['$scope', function ($scope) {
   
}]);

