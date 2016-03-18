angular.module('controllers')
.controller('Application', function($scope,$rootScope,Memory) {
	
	$rootScope.User=Memory.get("User");
	$rootScope.$watch("User",function(newv,oldv){
		if(newv){
			Memory.set($rootScope.User)
		}
	},true)
})