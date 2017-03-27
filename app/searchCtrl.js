myApp.controller('searchCtrl', ['$scope', '$http', 'PagerService', function ($scope, $http, PagerService) {
    // Initializing variables
    $scope.searchString = '';
    $scope.data = {};
    $scope.movieDetail = null;
    $scope.currentPage = 1;
    $scope.msg = '';
    // function to call api
    var myFn = function () {
        var myUrl = 'http://www.omdbapi.com/?s=' + $scope.searchString + '&page=' + $scope.currentPage;
        $http({
            method: 'GET',
            url: myUrl
        }).then(function successCallback(response) {
            $scope.data = response.data;                        //if data is available
            if (response.data.Response !== 'True' && $scope.searchString !== '')       // if data is not available
                $scope.msg = 'No search results available';
            else
                $scope.msg = '';
            $scope.setPage($scope.currentPage);                 //get a pager object whenever data is got 
        })
    }
    //methods for click events back and forth to movie Detail 
    $scope.detail = function (item) {
        $scope.movieDetail = item;
    }
    $scope.backToSearch = function () {
        $scope.movieDetail = null;
    }
    // call the api if searchString changes
    $scope.$watch('searchString', function (newVal, oldVal) {
        if (oldVal !== newVal) {
            myFn();
        }
    })
    //call the api if currentPage changs
    $scope.$watch('currentPage', function (oldValue, newValue) {
        if (oldValue !== newValue) {
            myFn();
        }
    })
    //get pager object 
    $scope.setPage = function (page) {
        $scope.currentPage = page;
        $scope.pager = PagerService.GetPager($scope.data.totalResults, $scope.currentPage, $scope.data.Search.length);
        if ($scope.currentPage === $scope.pager.totalPages) {
            $scope.resend = $scope.data.totalResults;              //result index end to be shown on the screen
        }
        else {
            $scope.resend = $scope.data.Search.length * $scope.currentPage;
        }
        $scope.resstart = $scope.resend - ($scope.data.Search.length - 1);      //result index start to be shown on the screen
    }
}]);
