angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope,$ionicLoading,$ionicPopup,$state,$ionicPlatform,Proyectos,Conexion) {

        $scope.proyecto={};

        $scope.iniciarSesion=function(){
            $ionicLoading.show(
                {
                    template:'Validando Proyecto'

                });

            Proyectos.validarProyecto($scope.proyecto).then(
                function(res){
                    $ionicLoading.hide();
                    if(res.length>0) {
                        localStorage.proyecto = JSON.stringify(res[0]);
                      //  $state.go("tab.blocs");
                    }
                    else{
                        $ionicPopup.alert({
                            template:'Credenciales incorrectas',
                            title: '¡Error!'
                        });
                    }
                },
                function(err){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template:'Error al validar el usuario',
                        title: '¡Error!'
                    });
                });
        };


        $ionicPlatform.ready(function(){
            if(localStorage.proyecto){
                $scope.proyecto=JSON.parse(localStorage.proyecto);
                if(Conexion.getEstado()){
                    $scope.iniciarSesion();
                }

                else
                {
             //       $state.go("tab.blocs");

                }

            }

        });

    })

    .controller('RegistroCtrl', function($scope,$http,$state,$ionicLoading,$ionicPopup) {
        $scope.proyecto={};

        $scope.registro=function(){
            var url="https://proyectoscrumboard.azure-mobile.net/Proyectos";
            $http.defaults.headers.common={
                'X-ZUMO-APPLICATION':'JvrxlvWbdurQYUkRlACFMOcXBFbrtD91',
                'Access-Control-Allow-Origin':'*'

            };

            $ionicLoading.show(
                {
                    template:'Creando Proyecto'

                }

            );

            $http.post(url,$scope.proyecto).then(
                function(res){
                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        template:'Proyecto creado con exito',
                        title: '¡Exito!'

                    });

                    $state.go("noLogin.login");

                }
                ,
                function(err){
                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        template:'Error al creando el proyecto',
                        title: '¡Error!'

                    });

                }

            );

        }

    })
/*
    .controller('BlocsCtrl', function($scope,Tareas,Bbdd,Conexion) {
        $scope.Tareas=[];

        var pr=JSON.parse(localStorage.Proyecto);

        if(Conexion.getEstado()){
            Tareas.getTareasPorProyecto(pr.Nombre).then(function(res){

                    $scope.Tareas=res;
                    Bbdd.guardarBlocs(res);


                },
                function(err){
                    alert(err);

                });

        }
        else{

            Bbdd.().then(function(res){
                $scope.blocs=res;


            },function(err){
                alert(err);

            });

        }

    })

    .controller('BlocDetailCtrl', function($scope, $stateParams,Conexion, Tareas,Bbdd) {

        $scope.tareas=[];

        if(Conexion.getEstado()) {
            Tareas.getTareasPorProyecto($stateParams.proyecto).then(
                function (res) {
                    $scope.tareas = res;
                    Bbdd.guardarTareas(res);

                },
                function (err) {
                    alert(err);
                }
            );

        }
        else{
            Bbdd.buscarBacklog($stateParams.blocId).then(
                function (res) {
                    $scope.tareas=res;
                },
                function(err){

                    alert(err);
                }

            );

        }

    })
*/
//.controller('LoginCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
