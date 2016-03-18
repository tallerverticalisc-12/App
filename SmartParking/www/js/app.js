// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires''starter.services',
angular.module('starter', ['ionic', 'controllers','ionic-material', 'ngCordova','ngAnimate',"ngTouch",'uiGmapgoogle-maps','LocalStorageModule','ngError','services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	  //StatusBar.backgroundColorByHexString("#059DB5");
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
	  ionic.Platform.isFullScreen=true;
    }
    if(window.StatusBar) {
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#181818");
        StatusBar.styleLightContent();
        StatusBar.show();
    }
	$ionicPlatform.registerBackButtonAction(function (event) {
    	event.preventDefault();
    }, 100);
  });
})
.config(function($stateProvider, $urlRouterProvider,localStorageServiceProvider,uiGmapGoogleMapApiProvider,$ionicConfigProvider) {
	uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA9Pf6xs5oXGWmLsxZizEUdQMLrzR-mSmA',
        libraries: 'places',
        preventLoad: false,
		transport:"https"
    });
	$ionicConfigProvider.views.maxCache(10);
	$ionicConfigProvider.views.swipeBackEnabled(false);
	$ionicConfigProvider.platform.ios.views.maxCache(10);
	$ionicConfigProvider.platform.android.views.maxCache(10);
	$ionicConfigProvider.views.transition("ios");
	$ionicConfigProvider.views.forwardCache(true);
	$ionicConfigProvider.form.checkbox("circle")
	// LocalStorage config
	localStorageServiceProvider
	.setPrefix('smartParking')
	.setStorageType('localStorage');
  
	$stateProvider.state('app', {
		url: '/app',
        abstract: true,
        templateUrl: 'screens/app.html',
        controller: 'Application'
    })
	.state('app.login', {
        url: '/login',
        views: {
            'contenido-app': {
                templateUrl: 'screens/login.html',
                controller: 'Login'
            },
        }
    })
	.state('app.home', {
        url: '/home',
        views: {
            'contenido-app': {
                templateUrl: 'screens/home.html',
                controller: 'Home'
            }
        }
    })
	/*.state('app.registro', {
        url: '/registro',
		abstract: true,
        views: {
            'contenido-app': {
                templateUrl: 'screens/registro.html',
                controller: 'Registro'
            },
        }
    })
	.state('app.registro.datos', {
        url: '/datos',
        views: {
            'contenido-registro': {
                templateUrl: 'screens/registro_datos.html',
            },
        }
    })
	.state('app.registro.codigo', {
        url: '/codigo',
        views: {
            'contenido-registro': {
                templateUrl: 'screens/registro_codigo.html',
            },
        }
    })
	.state('app.registro.final', {
        url: '/final',
        views: {
            'contenido-registro': {
                templateUrl: 'screens/registro_final.html',
            },
        }
    })
	.state('app.recuperar', {
        url: '/recuperar',
        views: {
            'contenido-app': {
                templateUrl: 'screens/recuperar.html',
				controller: 'Recuperar'
            },
        }
    })
	.state('app.home',{
		url:'/home',
		abstract:true,
		views:{
			'contenido-app':{
				templateUrl: 'screens/home.html',
				controller: 'Home'
			}
		}
	})
	.state('app.home.mapa', {
        url: '',
		id:1,
        views: {
            'contenido-home': {
                templateUrl: 'screens/mapa.html',
				controller: 'Mapa'
            },
			'contenido-menu':{
				templateUrl: 'screens/menu.html',
				controller: 'Menu'
			}
        }
    })
	.state('app.home.notificaciones', {
        url: '',
		id:2,
        views: {
            'contenido-home': {
                templateUrl: 'screens/notificaciones.html',
				controller: 'Notificaciones'
            },
        }
    })
	.state('app.home.contactos', {
        url: '',
		id:3,
        views: {
            'contenido-home': {
                templateUrl: 'screens/contactos.html',
				controller: 'Contactos'
            },
        }
    })
	.state('app.home.reportes', {
        url: '',
		id:4,
        views: {
            'contenido-home': {
                templateUrl: 'screens/reportes.html',
				controller: 'Reportes'
            },
        }
    })*/
	$urlRouterProvider.otherwise('/app/login');
})