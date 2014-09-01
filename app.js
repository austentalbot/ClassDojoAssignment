var app = angular.module('dojo', []);

app.controller('load', function($http, $scope) {
  $scope.classes = {};
  $scope.queryDojo = function() {
    $http({
      url: 'http://teach.classdojo.com/api/interviewChallenge',
      method: 'GET'
    }).success(function(data) {
      console.log(data);
      for (var i=0 ; i<data.awards.length; i++) {
        var award = data.awards[i];
        //initialize empty objects for student and time details
        if (!(award.classroom in $scope.classes)) {
          $scope.classes[award.classroom]={students: {}, times: Array.apply(null, new Array(24)).map(Number.prototype.valueOf,0)}
        }
        //fill in student details
        if (!(award.student in $scope.classes[award.classroom].students)) {
          $scope.classes[award.classroom].students[award.student]={};
          $scope.classes[award.classroom].students[award.student].count = 1;
          $scope.classes[award.classroom].students[award.student].score = award.weight;
        } else {
          $scope.classes[award.classroom].students[award.student].count++;
          $scope.classes[award.classroom].students[award.student].score += award.weight;
        }
        //fill in time details
        $scope.classes[award.classroom].times[moment(award.date).format('H')] += award.weight;
      };

      console.log($scope.classes);
    
      // var nums=[];
      // for (var i=0; i<24; i++) {
      //   nums.push(moment(i, 'H').format('h a'));
      // }
      // var ctx = document.getElementById("myChart").getContext("2d");
      // var data = {
      //     labels: nums,
      //     datasets: [
      //         {
      //             label: "My First dataset",
      //             fillColor: "rgba(220,220,220,0.2)",
      //             strokeColor: "rgba(220,220,220,1)",
      //             pointColor: "rgba(220,220,220,1)",
      //             pointStrokeColor: "#fff",
      //             pointHighlightFill: "#fff",
      //             pointHighlightStroke: "rgba(220,220,220,1)",
      //             data: classes.Biology.times
      //         }
      //     ]
      // };
      // var myLineChart = new Chart(ctx).Line(data);

    });

    $scope.createChart = function(name, content) {
      var nums=[];
      for (var i=0; i<24; i++) {
        nums.push(moment(i, 'H').format('h a'));
      }
      var ctx = document.getElementById(name).getContext("2d");
      var data = {
          labels: nums,
          datasets: [
              {
                  label: "My First dataset",
                  fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(220,220,220,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(220,220,220,1)",
                  data: content.times
              }
          ]
      };
      var myLineChart = new Chart(ctx).Line(data);
    };




  };


});

