myApp.controller('searchCtrl', ['$scope', '$http', 'PagerService', function ($scope, $http, PagerService) {

    $scope.searchString = '';
    $scope.data = {};
    $scope.movieDetail = null;
    var myFn = function (){
        var myUrl = 'http://www.omdbapi.com/?s=' + $scope.searchString + '&page=' + $scope.pager.currentPage;
            $http({
                method: 'GET',
                url: myUrl
            }).then(function successCallback(response) {
                $scope.data = response.data;               
                if($scope.pager.currentPage === $scope.pager.totalPages ){
                $scope.resend = $scope.data.totalResults;
                }
                else{
                $scope.resend = $scope.data.Search.length*$scope.pager.currentPage;
                }
                $scope.resstart = $scope.resend-($scope.data.Search.length - 1);
               })
    }
   
    $scope.detail = function (item) {
        $scope.movieDetail = item;
    }
    $scope.setPage = function (page) {
                    $scope.pager = PagerService.GetPager($scope.data.totalResults, page);
    }
    $scope.setPage(1);
    $scope.backToSearch = function (){
        $scope.movieDetail = null;
    }
    $scope.$watch('searchString', function (newVal, oldVal) {
        if(oldVal!==newVal){
        myFn();
        $scope.setPage(1);
        }
    })
    $scope.$watch('pager.currentPage', function (oldValue, newValue){
        if(oldValue !== newValue)
        myFn();
    })

}]);
