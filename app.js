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
          $scope.classes[award.classroom]={
            students: {},
            times: {
              good: Array.apply(null, new Array(24)).map(Number.prototype.valueOf,0),
              bad: Array.apply(null, new Array(24)).map(Number.prototype.valueOf,0)
            }
          };
        }
        //fill in student details
        if (!(award.student in $scope.classes[award.classroom].students)) {
          $scope.classes[award.classroom].students[award.student] = {};
          $scope.classes[award.classroom].students[award.student].count = 1;
          if (award.weight>0) {
            $scope.classes[award.classroom].students[award.student].good = award.weight;
            $scope.classes[award.classroom].students[award.student].bad = 0;
          } else {
            $scope.classes[award.classroom].students[award.student].good = 0;
            $scope.classes[award.classroom].students[award.student].bad = award.weight*-1;
          }
        } else {
          $scope.classes[award.classroom].students[award.student].count++;
          if (award.weight>0) {
            $scope.classes[award.classroom].students[award.student].good += award.weight;
          } else {
            $scope.classes[award.classroom].students[award.student].bad -= award.weight;
          }
        }
        //fill in time details
        if (award.weight>=0) {
          $scope.classes[award.classroom].times.good[moment(award.date).format('H')] += award.weight;
        } else {
          $scope.classes[award.classroom].times.bad[moment(award.date).format('H')] -= award.weight;
        }
      }
      //remove waiting animation when loaded
      document.getElementsByClassName('spinner')[0].remove();
    });

    $scope.createTimeline = function(name, content) {
      var nums=[];
      //create time labels
      for (var i=0; i<24; i++) {
        nums.push(moment(i, 'H').format('h a'));
      }
      //set up canvas
      var ctx = document.getElementById(name).getContext("2d");
      ctx.canvas.width = window.innerWidth/1.2;
      ctx.canvas.height = 300;
      //set up options and chart data
      var options = {
        scaleFontFamily: "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        scaleOverride: true,
        scaleSteps: 10,
        scaleStepWidth: Math.ceil(Math.max.apply(null, content.times.good.concat(content.times.bad)) / 10),
        scaleStartValue: 0
      };
      var data = {
        labels: nums,
        datasets: [
          {
            label: 'weighted good behavior',
            fillColor: "rgba(68,191,135,0.2)",
            strokeColor: "rgba(68,191,135,1)",
            pointColor: "rgba(68,191,135,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: content.times.good
          }, {
            label: 'weighted bad behavior',
            fillColor: "rgba(242,154,63,0.2)",
            strokeColor: "rgba(242,154,63,1)",
            pointColor: "rgba(242,154,63,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: content.times.bad
          }
        ]
      };
      var lineChart = new Chart(ctx).Line(data, options);
    };
  };
});
