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
        pageSize = pageSize || 10;
 
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
    
 
    // initController();
 
    // function initController() {
    //     // initialize to page 1
    //     $scope.setPage(1);
    // }
 
    // function setPage(page) {
    //     if (page < 1 || page > $scope.pager.totalPages) {
    //         return;
    //     }
 
    //     // get pager object from service
    //     $scope.pager = PagerService.GetPager($scope.movies.Search.length, page);
 
    //     // get current page of items
    //     $scope.items = $scope.movies.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    // }
	
	$scope.$watch('searchString', function (oldVal, newVal) {
	if (oldVal !== newVal){
	var myUrl = 'http://www.omdbapi.com/?s=' + $scope.searchString;
	$http({
  method: 'GET',
  url: myUrl
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  
    $scope.data = response.data;
    // $scope.data = _.range(1, $scope.data.totalResults);
    // $scope.setPage = function (page) {
    //     if (page < 1 || page > $scope.pager.totalPages) {
    //         return;
    //     }
 
    //     // get pager object from service
    //     $scope.pager = PagerService.GetPager($scope.data.Search.length, page);
 
    //     // get current page of items
    //     $scope.items = $scope.data.Search.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    // }
})
}

	})

// initController();
 
//     function initController() {
//         // initialize to page 1
//         $scope.setPage(1);
//     }

//     myApp.filter('searchFor', function(){

// 	// All filters must return a function. The first parameter
// 	// is the data that is to be filtered, and the second is an
// 	// argument that may be passed with a colon (searchFor:searchString)

// 	return function(arr, searchString){

// 		if(!searchString){
// 			return arr;
// 		}

// 		var result = [];

// 		searchString = searchString.toLowerCase();

// 		// Using the forEach helper method to loop through the array
// 		angular.forEach(arr, function(item){

// 			if(item.title.toLowerCase().indexOf(searchString) !== -1){
// 				result.push(item);
// 			}

// 		});

// 		return result;
// 	};

// });



}]);
myApp.controller('forecastCtrl', ['$scope', function ($scope) {
   
}]);

