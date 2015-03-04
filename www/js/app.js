// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // vista abstracta usuario sin registrar
    .state('noLogin', {
        url: "/noLogin",
        abstract: true,
        templateUrl: "templates/noLogin.html"
    })

    // vista de login de proyecto
        .state('noLogin.login', {
            url: '/login',
            views: {
                'loginView': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
                }
            }
        })

      .state('noLogin.registro', {
          url: '/registro',
          views: {
              'loginView': {
                  templateUrl: 'templates/registro.html',
                  controller: 'RegistroCtrl'
              }
          }
      })


    // vista abstracta tarea
    .state('tasks', {
        url: "/tasks",
        abstract: true,
        templateUrl: "templates/tasks.html"
      })

        .state('tasks.backlog', {
            url: '/backlog',
            views: {
            'tab-dash': {
                templateUrl: 'templates/tasks-backlog.html',
                controller: 'BacklogCtrl'
                }
            }
        })

      .state('tasks.todo', {
          url: '/to-do',
          views: {
              'tab-dash': {
                  templateUrl: 'templates/tasks-todo.html',
                  controller: 'To-doCtrl'
              }
          }
      })

      .state('tasks.inreview', {
          url: '/in-review',
          views: {
              'tab-dash': {
                  templateUrl: 'templates/tasks-inreview.html',
                  controller: 'in-reviewCtrl'
              }
          }
      })

      .state('tasks.done', {
          url: '/done',
          views: {
              'tab-dash': {
                  templateUrl: 'templates/tasks-done.html',
                  controller: 'DoneCtrl'
              }
          }
      });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/noLogin/login');

});
