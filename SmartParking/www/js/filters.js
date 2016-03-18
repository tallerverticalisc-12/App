angular.module('starter')
.filter('getTotalAvailable', function () {
	return function (input) {
	   if(input){
		  var tot=0;
		   for(var i=0;i<input.length;i++)
		   	tot+=input[i].available;
		return tot;  
	   }
	}
})
.filter('getTotalSeats', function () {
	return function (input) {
	   if(input){
		   var tot=0;
		   for(var i=0;i<input.length;i++)
		   	tot+=input[i].seats;
		return tot;
	   }
	}
})

.filter('timeRem', function () {
	return function (input) {
	   if(input){
		   var date= new Date();
		   var dif=(input-date.getTime())/(1000)
		   var min=Math.floor(dif/60);
		   var sec=Math.round(dif%60);
		   return min+":"+sec;
	   }
	}
})