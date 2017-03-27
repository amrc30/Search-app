myApp.controller('searchCtrl', ['$scope', '$http', 'PagerService', function ($scope, $http, PagerService) {

    $scope.searchString = '';
    $scope.data = {};
    $scope.movieDetail = null;
    $scope.currentPage = 1;
    $scope.msg = '';

    var myFn = function () {
        var myUrl = 'http://www.omdbapi.com/?s=' + $scope.searchString + '&page=' + $scope.currentPage;
        $http({
            method: 'GET',
            url: myUrl
        }).then(function successCallback(response) {
            $scope.data = response.data;
            if (response.data.Response !== 'True' && $scope.searchString !== '')
                $scope.msg = 'No search results available';
            else
                $scope.msg = '';
            $scope.setPage($scope.currentPage);
        })
    }

    $scope.detail = function (item) {
        $scope.movieDetail = item;
    }

    $scope.backToSearch = function () {
        $scope.movieDetail = null;
    }

    $scope.$watch('searchString', function (newVal, oldVal) {
        if (oldVal !== newVal) {
            // $scope.currentPage = 1;
            myFn();
        }
    })

    $scope.$watch('currentPage', function (oldValue, newValue) {
        if (oldValue !== newValue) {
            myFn();
        }
    })

    $scope.setPage = function (page) {
        $scope.currentPage = page;
        $scope.pager = PagerService.GetPager($scope.data.totalResults, $scope.currentPage, $scope.data.Search.length);
        if ($scope.currentPage === $scope.pager.totalPages) {
            $scope.resend = $scope.data.totalResults;
        }
        else {
            $scope.resend = $scope.data.Search.length * $scope.currentPage;
        }
        $scope.resstart = $scope.resend - ($scope.data.Search.length - 1);
    }
}]);
