myApp.controller('searchCtrl', ['$scope', '$http', 'PagerService', function ($scope, $http, PagerService) {

    $scope.searchString = '';

    $scope.pager = {};
    $scope.pager.pageSize = 10;
    $scope.pager.currentPage = 1;
    $scope.searchByName = function () {
        $scope.IdSearch = false;
    }
    $scope.searchById = function () {
        $scope.IdSearch = true;
    }
    $scope.movieDetail = null;
    $scope.detail = function (item) {
        $scope.movieDetail = item;
    }
    $scope.backToSearch = function (){
        $scope.movieDetail = null;
    }
    $scope.$watchGroup(['searchString', 'pager.currentPage'], function (newVal, oldVal) {
        if (oldVal !== newVal) {
            var myUrl = 'http://www.omdbapi.com/?s=' + $scope.searchString + '&page=' + $scope.pager.currentPage;
            $http({
                method: 'GET',
                url: myUrl
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

                $scope.data = response.data;
                $scope.setPage = function (page) {
                    $scope.pager = PagerService.GetPager($scope.data.totalResults, page);
                }
                $scope.pager.totalPages = Math.ceil($scope.data.totalResults / $scope.pager.pageSize);
                if($scope.pager.currentPage === $scope.pager.totalPages ){
                $scope.resend = $scope.data.totalResults;
                }
                else{
                $scope.resend = $scope.data.Search.length*$scope.pager.currentPage;
                }
                $scope.resstart = $scope.resend-($scope.data.Search.length - 1);
                var startPage, endPage;
                if ($scope.pager.totalPages <= 10) {
                    // less than 10 total pages so show all
                    startPage = 1;
                    endPage = $scope.pager.totalPages;
                } else {
                    // more than 10 total pages so calculate start and end pages
                    if ($scope.pager.currentPage <= 6) {
                        startPage = 1;
                        endPage = 10;
                    } else if ($scope.pager.currentPage + 4 >= $scope.pager.totalPages || $scope.pager.currentPage === $scope.pager.totalPages) {
                        startPage = $scope.pager.totalPages - 9;
                        endPage = $scope.pager.totalPages;
                    } else {
                        startPage = $scope.pager.currentPage - 5;
                        endPage = $scope.pager.currentPage + 4;
                    }
                }
                $scope.pages = _.range(startPage, endPage + 1);
            })
        }
    })

}]);