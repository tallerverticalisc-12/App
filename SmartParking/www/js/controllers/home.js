angular.module('controllers')
.controller('Home', function($scope,$rootScope,uiGmapGoogleMapApiManualLoader,$animate,uiGmapIsReady,uiGmapGoogleMapApi,$timeout,socket,Message,Memory,$ionicViewSwitcher,$state,$timeout,$ionicSlideBoxDelegate ,$interval) {
	angular.element(document.getElementById("info_info")).css("opacity",0)
	//$scope.info_error=false;
	$scope.parkselected=false;
	
	$scope.$on('$ionicView.beforeEnter',function(){
		if(!Memory.get("User")){
		$ionicViewSwitcher.nextDirection('enter');
		$state.go('app.login');
	}
		
	})
	$scope.$on('$ionicView.afterEnter',function(){
            //if(!Memory.get("Usuario"))
			$timeout(function() {
				angular.element(document.getElementById("app_content")).removeClass("invisible")
                if(navigator.splashscreen)navigator.splashscreen.hide();
            }, 500);
			
			
    })
		
	$scope.parkings=[];
	
	$scope.initializeMap=function(){
		$scope.directionsService = new google.maps.DirectionsService;
		$scope.currentdirectionsService = new google.maps.DirectionsService;
  		$scope.directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#0AC3D6" },suppressMarkers:true ,preserveViewport:true});
		$scope.map = { 
			center: { latitude: 20.733304, longitude:  -103.454390}, 
			zoom:20,
			options:{
				minZoom:16,
				mapTypeControl: false,
				panControl: false,
				zoomControl: false,
				scaleControl: false,
				streetViewControl: false,
				styles:[
					{
						featureType: "poi",
						stylers: [{ visibility: "off" }]   
					},
					{
						featureType: "all",
						elementType: "labels",
						stylers: [
						  { visibility: "off" }
						]
					},
					{
						featureType: "all",
						elementType: "geometry",
					}
					/*{
						"featureType": "road",
						"stylers": [
							{ "gamma": 1.07 },
							{ "lightness": 6 },
							{ "hue": "#00bbff" },
							{ "saturation": -67 }
						]
					}*/
				],
			},
			events:{
				resize:function(event){
					$scope.map.center={ latitude: $scope.map.location.position.latitude, longitude:  $scope.map.location.position.longitude}
					console.log(3);
				}
			},
			location:{
				position:{latitude: 20.731890, longitude: -103.453970},
				options:{
					draggable:false,
					zIndex:10000,
					icon:{
						url:"img/icons/location.png" ,
						size: new google.maps.Size(20, 20),
						//define el punto de orgen
						origin: new google.maps.Point(0,0),
						//define el centro del puntero
						anchor: new google.maps.Point(10, 10),
						//define el tamaño a proyectar 
						scaledSize:new google.maps.Size(20, 20)
					},
					shape:{
						coords: [0, 0, 0, 20, 20, 20, 20 , 0],
						type: 'poly',
					},
					visible:true,
					opacity:1,
				},
				events:{
				}
			}
		}
		
	}
	//uiGmapGoogleMapApiManualLoader.load();
	
	uiGmapGoogleMapApi.then(function(){
		$scope.info_loading=true;
		$scope.initializeMap();
		
	})
	uiGmapIsReady.promise().then(function(maps){
	//$scope.parkInstructions();
	//Message.alert("title","body");
		angular.element(document.getElementById("info_info")).css("opacity",1)
		$scope.conectado=$rootScope.$on("socket.connect",$scope.conectedonce)
		socket.inicializa();
		
	})
	$scope.getZones=function(data){
		var df=$ionicSlideBoxDelegate.currentIndex()
			$scope.info_loading=false;
		if(data && data.length){
			
			$scope.info_error=false;
			var zonas=[];
			var zona={}
			var zn=0
			for(var i=0;i<data.length;i++){
				if(data[i].IdZone!=zn){
					if(i!=0){
						zonas.push(zona)
						zona={}
					}
					zn=data[i].IdZone;
					zona.name=data[i].Name;
					zona.description=data[i].Description;
					zona.zoneId=data[i].IdZone;
					zona.seats=[];
					zona.totalAv=0;
					
				}
				zona.totalAv+=data[i].Available;
				zona.seats.push({type:data[i].Type,available:data[i].Available,seats:data[i].Seats})
				if(i==data.length-1)zonas.push(zona)
			}
			
			
			$scope.parkings=zonas
			var final=0;
			var max=0;
			for(var i=0; i<$scope.parkings.length;i++)
				if($scope.parkings[i].totalAv>max){
					max=$scope.parkings[i].totalAv;
					final=i;
				}
			$scope.$apply(function(){})
			$ionicSlideBoxDelegate.update()
			$ionicSlideBoxDelegate.slide(df)
		}else {
			$scope.info_error=true;
			$scope.$apply(function(){})
		}
		
		//console.log(data);
	}
	$scope.parkOut=function(data){
		socket.getSocket().off("getParkOut",$scope.parkOut);
		$timeout(function(){
		$scope.backToSelect()
		Message.alert("Parking time","Sorry, you exceed the time for arrive your parking, select one again.");
		},800)
		
	}
$scope.getPark=function(data){
	if(interval)$interval.cancel(interval);
	socket.getSocket().on("getParkOut",$scope.parkOut);
	Message.hideLoading();
	$scope.asigned={
			zoneId:data.zone_id,
			zoneName:data.Zone,
			parkId:data.space,
			position:{latitude:data.latitude, longitude:data.longitude},
			typeId:data.type_id,
			distance:0,
			time:0,
			timewait:data.valid,
			typeName:data.Type,
				options:{
					draggable:false,
					zIndex:1,
					icon:{
						url:"img/icons/destination.png" ,
						size: new google.maps.Size(20, 20),
						origin: new google.maps.Point(0,0),
						anchor: new google.maps.Point(10, 10),
						scaledSize:new google.maps.Size(20, 20)
					},
					shape:{
						coords: [0, 0, 0, 20, 20, 20, 20 , 0],
						type: 'poly',
					},
					visible:true,
					opacity:1,
				}
		}
	$scope.parkInstructions();
}
$scope.getTimeRem=function(){
	if($scope.asigned){
	var date= new Date();
		   var dif=($scope.asigned.timewait-date.getTime())/(1000)
		   var min=Math.floor(dif/60);
		   var sec=Math.round(dif%60);
		   return min+":"+sec;
	}
}
var interval=null;
	$scope.conectedonce=function(evt,res){
		socket.getSocket().on("getZones",$scope.getZones);
		$scope.conectado();
		if(interval)$interval.cancel(interval);
		$scope.zonasr()
		interval=$interval(function(){
			$scope.zonasr()
		},4000);
		
	}
	$scope.zonasr=function(){
		
		socket.getSocket().emit("getZones");
	}
	
			
	$scope.logout=function(){
		Memory.clean();
		socket.close();
		document.location.href="index.html"
	};
	$scope.backToSelect=function(){
		if(interval)$interval.cancel(interval);
		$scope.zonasr()
		interval=$interval(function(){
			$scope.zonasr()
		},4000);
		socket.getSocket().emit("setParkOut",$scope.asigned.parkId,$scope.asigned.zoneId);
		$scope.parkselected=false;
		angular.element(document.getElementById("general-info")).css("opacity",0)
		$animate.removeClass(document.getElementById("general-info"),'hide-areas')
		$animate.addClass(document.getElementById("general-info"),'show-areas')
		$animate.removeClass(document.getElementById("map"),'reduce-map')
		$animate.addClass(document.getElementById("map"),'large-map')
		$animate.removeClass(document.getElementById("map-info"),'show-infomap')
		$animate.addClass(document.getElementById("map-info"),'hide-infomap')
	}
	$scope.parkHere=function(){
		//reserva
		
		socket.getSocket().on("getPark",$scope.getPark);
		socket.getSocket().emit("getPark",1);
		Message.showLoading("");
	}
	
	$scope.parkInstructions=function(){
		$animate.removeClass(document.getElementById("general-info"),'show-areas')
		$animate.addClass(document.getElementById("general-info"),'hide-areas')
		$animate.removeClass(document.getElementById("map"),'large-map')
		$animate.addClass(document.getElementById("map"),'reduce-map')
		$animate.removeClass(document.getElementById("map-info"),'hide-infomap')
		$animate.addClass(document.getElementById("map-info"),'show-infomap')
		$timeout(function(){
			google.maps.event.trigger($scope.map.getGMap(), 'resize');
			$scope.calculateAndDisplayRoute();
			$scope.parkselected=true;
		},700)
		$scope.asigned.icon={
				url:"img/icons/location.png" ,
				size: new google.maps.Size(20, 20),
				//define el punto de orgen
				origin: new google.maps.Point(0,0),
				//define el centro del puntero
				anchor: new google.maps.Point(10, 10),
				//define el tamaño a proyectar 
				scaledSize:new google.maps.Size(20, 20)
			}
	}
	$scope.calculateAndDisplayRoute=function() {
		var origen= new google.maps.LatLng($scope.map.location.position.latitude,$scope.map.location.position.longitude);
		var destino= new google.maps.LatLng($scope.asigned.position.latitude,$scope.asigned.position.longitude);
		
		$scope.directionsService.route({
   			origin: origen,
    		destination: destino,
    		travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC,
			durationInTraffic:true,
			provideRouteAlternatives:true,
			
  		}, function(response, status) {
			console.log(response);
    		if (status === google.maps.DirectionsStatus.OK) {
				/*$scope.$apply(function () {
				$rootScope.directions=response.routes;
				$scope.dirSelect=0;
				})*/
				//console.log(response.routes[0].legs[0])//.distance.value);duration
				$scope.routes=response.routes;
				$scope.asigned.distance=response.routes[0].legs[0].distance.value
				$scope.asigned.time=(response.routes[0].legs[0].duration.value/60).toFixed(2);
      			$scope.directionsDisplay.setDirections(response);
				$scope.directionsDisplay.setMap($scope.map.getGMap());
				
				
    		} else {
      			//$rootScope.directions=[];
    		}
  		});
	}	
	$scope.centermap=function(){
		var bounds = $scope.routes[0].bounds;
        $scope.map.getGMap().fitBounds(bounds);
        $scope.map.getGMap().setCenter(bounds.getCenter());
	}
	//if(positionId)navigator.geolocation.clearWatch(positionId);
	//positionId = navigator.geolocation.watchPosition(positionSuccess, positionError,{enableHighAccuracy: true,timeout:15000 });
	//navigator.geolocation.getCurrentPosition($scope.successReporte, $scope.reporteError,{enableHighAccuracy: true,timeout:15000 ,maximumAge:500});
	$scope.getTotalAvailable=function(input){
		var tot=0;
		   for(var i=0;i<input.length;i++)
		   	tot+=input[i].available;
		return tot;  
	}
	
})