myApp.controller('idCtrl', ['$scope', '$http', 'PagerService', function ($scope, $http, PagerService) {
    //Initializing variables
    $scope.pager = {};
    $scope.pager.pageSize = 10;
    $scope.pager.currentPage = 1;
    $scope.idString = '';
    // method to call api on a click event
    $scope.searchId = function () {
        var myUrl1 = 'http://www.omdbapi.com/?i=' + $scope.idString;
        $http({
            method: 'GET',
            url: myUrl1
        }).then(function successCallback(response) {
            $scope.info = response.data;
            if (response.data.Error)
                $scope.error = response.data.Error;
            else
                $scope.error = '';
        })
    }
}])