var app = angular.module('app', []);

// app constant that can be used site wide
app.constant('API_URL', 'http://fake-co-calendar.herokuapp.com/api/v1/events?callback=JSON_CALLBACK')

app.controller('AppCtrl', ['$scope', '$http', 'API_URL', '$interval', function($scope, $http, API_URL, $interval){
  var dates = [];
  var now = new Date();

  // get current time
  var currentTime = function(){
    $scope.currentTime = new Date();
  }

  var events = {
    load: function(){
      // load events
      $http.jsonp(API_URL).success(function (data){
        var events = data.events;

        // get start and end date of each
        for(var i = 0; i < events.list.length; i++) {
          events.list[i].start_time = Date.parse(events.list[i].start_time);
          events.list[i].end_time = Date.parse(events.list[i].end_time);

          dates.push({
            start_time: events.list[i].start_time,
            end_time: events.list[i].end_time
          });
        };

        // meeting status checks
        meetings.current();
        meetings.soon();

        $scope.events = events.list;

      });      
    }
  }

  var meetings = {
    current: function(){
      for(var i = 0; i < dates.length; i++) {
        // is now between meeting start and end time? 
        if (now >= dates[i].start_time && now <= dates[i].end_time) {
          $scope.currentEvent = dates[i].start_time;
        }
      }      
    },
    soon: function(){ 
      for(var i = 0; i < dates.length; i++) {
        // is now close to start date?
        var eventDate = new Date(dates[i].start_time);
        var seconds = Math.round((eventDate - now) / 1000);

        // 1800 seconds = 30 min
        if (seconds < 1800 && seconds > 0){
          $scope.soonEvent = dates[i].start_time;
        }

      }      
    }
  }

  // polling by seconds
  $interval(events.load, 1000);
  $interval(currentTime, 1000);

}]);