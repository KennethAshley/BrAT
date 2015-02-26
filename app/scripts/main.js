var app = angular.module('app', []);

// app constant that can be used site wide
app.constant('API_URL', 'http://fake-co-calendar.herokuapp.com/api/v1/events?callback=JSON_CALLBACK')

app.controller('AppCtrl', ['$scope', '$http', 'API_URL', function($scope, $http, API_URL){

  var events = {
    load: function(){
      // load events
      $http.jsonp(API_URL).success(function (data){
        var events = data.events;

        $scope.events = events.list;

      });      
    }
  }

  events.load();

}]);