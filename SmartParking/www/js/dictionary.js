angular.module('controllers',[])
.controller('Dictionary', function($scope,$rootScope) {
	$rootScope.dictionary={
		General:{
			1:"Acept",
			2:"Cancel",
		},
		Login:{
			1:"User",
			2:"Password",
			3:"Park in",
			4:"Sing up here!",
			5:"Login",
			6:"The credentials you supplied were not correct. Please verify and try again."
		},
		Home:{
			1:"Please wait...",
			2:"We're looking for the best place for you!",
			3:"Choose parking zone",
			4:"Parking",
			5:"Availability",
			6:"Total seats",
			7:"Park here!",
			8:"Network error",
			9:"Right now there're no places available, please wait till one turns available."
		}
	}
})