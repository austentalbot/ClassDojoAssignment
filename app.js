var app = angular.module('dojo', []);

app.controller('load', function($http, $scope) {
  var classes = {};
  $scope.queryDojo = function() {
    $http({
      url: 'http://teach.classdojo.com/api/interviewChallenge',
      method: 'GET'
    }).success(function(data) {
      console.log(data);
      for (var i=0 ; i<data.awards.length; i++) {
        var award = data.awards[i];
        //initialize empty objects for student and time details
        if (!(award.classroom in classes)) {
          classes[award.classroom]={students: {}, times: {
            0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0,
            12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0
          }};
        }
        //fill in student details
        if (!(award.student in classes[award.classroom].students)) {
          classes[award.classroom].students[award.student]={};
          classes[award.classroom].students[award.student].count = 1;
          classes[award.classroom].students[award.student].score = award.weight;
        } else {
          classes[award.classroom].students[award.student].count++;
          classes[award.classroom].students[award.student].score += award.weight;
        }
        //fill in time details
        classes[award.classroom].times[moment(award.date).format('H')] += award.weight;
      };

      console.log(classes);
    });
  
    var ctx = document.getElementById("myChart").getContext("2d");

    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };  

    var myLineChart = new Chart(ctx).Line(data);



  };


});

