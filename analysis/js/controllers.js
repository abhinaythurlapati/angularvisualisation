'use strict';

/* Controllers */

var dateCtrl = angular.module('dateCtrl', []);

dateCtrl.controller('firstCtrl', ['$scope', function($scope){
  	var ddate1 = $scope.strtDate;
	var ddate2 = $scope.endDate;
	//ddate2 = new Date('"'ddate2'"');
	//$scope.ddate3 = ddate2;
	//ddate2 = formatLocalDate(ddate2);

	//$scope.ddate4 = ddate2;
	console.log(ddate2);

	/*function formatLocalDate(now) {
	    		//var now = new Date(),
	          tzo = -now.getTimezoneOffset(),
	        	dif = tzo >= 0 ? '+' : '-',
	        	pad = function(num) {
	          var norm = Math.abs(Math.floor(num));
	          return (norm < 10 ? '0' : '') + norm;
	        };
	    	return now.getFullYear() 
	        + '-' + pad(now.getMonth()+1)
	        + '-' + pad(now.getDate())
	        + 'T' + pad(now.getHours())
	        + ':' + pad(now.getMinutes()) 
	        + ':' + pad(now.getSeconds()) 
	        + dif + pad(tzo / 60) 
	        + ':' + pad(tzo % 60);
	}*/
  }]);

dateCtrl.controller('nextCtrl', ['$scope', '$routeParams', '$http', '$window',
  function($scope, $routeParams, $http, $window) {

	function formatLocalDate(now) {
	    		//var now = new Date(),
	          var tzo = -now.getTimezoneOffset(),
	          dif = tzo >= 0 ? '+' : '-',
	        	pad = function(num) {
	          var norm = Math.abs(Math.floor(num));
	          return (norm < 10 ? '0' : '') + norm;
	        };

		console.log("Inside fn");
	    	return now.getFullYear() 
	        + '-' + pad(now.getMonth()+1)
	        + '-' + pad(now.getDate())
	        + 'T' + pad(now.getHours())
	        + ':' + pad(now.getMinutes()) 
	        + ':' + pad(now.getSeconds()) 
	        + dif + pad(tzo / 60) 
	        + ':' + pad(tzo % 60);
	}

	var date1 = new Date($routeParams.strtDate);
	var date2 = new Date($routeParams.endDate);

	date1 = new Date(date1.getFullYear(),date1.getMonth(),date1.getDate());
	date2 = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate());

	console.log("After date capture");
	date1 = formatLocalDate(date1);
	date2 = formatLocalDate(date2);

	console.log("After fn call");

	//date1 = date1.toISOString();
	//date2 = date2.toISOString();

	


	$scope.strtDate = date1;
     $scope.endDate = date2;

	var dateToJson = {
				"startDate":date1,
				"endDate":date2,
				};
	//var serializedData = $.param({name:Hello});

	$http({
	    method: 'POST',
	    url: 'http://54.165.108.35:8888/query',
	    data: angular.toJson(dateToJson),
	    headers: {
	        'Content-Type': 'text/plain',
		   'Accept':'text/plain'
	    }}).then(function(response) {
	           //console.log(result);
			//$scope.data = response;			
			var received = response.data;
			//received = JSON.parse(received);
			$scope.data = received;
//			$window.data = received;		
			runD3(received);

       });


	function runD3(data){
		var svg = dimple.newSvg("div.demo", 1500, 600);
    /*var data = [
      { "Session":"Morning", "type":"TotalTxWifi","data":2000},
      { "Session":"Morning", "type":"TotalRxWifi","data":3000},
      { "Session":"Evening", "type":"TotalTxWifi","data":1000},
      { "Session":"Evening", "type":"TotalRxWifi","data":4000},
      { "Session":"Night", "type":"TotalTxWifi","data":4000},
      { "Session":"Night", "type":"TotalRxWifi","data":8000},
      { "Session":"Early Morning", "type":"TotalTxWifi","data":3000},
      { "Session":"Early Morning", "type":"TotalRxWifi","data":4500},
    ];*/
	//debugger;
	//var data = data;
	//debugger;
	console.log("hello");
	var chart = new dimple.chart(svg,data);
    chart.addCategoryAxis("x", ["Session","type"]);
    chart.addMeasureAxis("y", "data");
    chart.addSeries("type", dimple.plot.bar);
    chart.addLegend(600, 10, 510, 20, "right");
    chart.draw();

	}
	 
}]);

	
