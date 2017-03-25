myApp.controller('idCtrl', ['$scope', '$http', 'PagerService', function ($scope, $http, PagerService) {
    $scope.pager = {};
    $scope.pager.pageSize = 10;
    $scope.pager.currentPage = 1;
    $scope.idString = '';
    $scope.searchId = function () {
        var myUrl1 = 'http://www.omdbapi.com/?i=' + $scope.idString;
        $http({
            method: 'GET',
            url: myUrl1
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.info = response.data;
            if (response.data.Error)
                $scope.error = response.data.Error;
        })
    }
}])