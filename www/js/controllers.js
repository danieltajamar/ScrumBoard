angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope, $state, $ionicLoading, $ionicPopup, Proyectos) {
        $scope.proyecto={};

        $scope.iniciarSesion=function(){

            $ionicLoading.show({
                template:'Validando Proyecto'
            });

            Proyectos.validarProyecto($scope.proyecto).then(

                function(res){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template:'Login correcto',
                        title: 'Exito!'
                    });
                    if(res.length>0){
                        localStorage.proyecto= JSON.stringify(res[0]);
                        $state.go("tasks.todo");
                    }
                    else{
                        $ionicPopup.alert({
                            template:'Credenciales incorrectas',
                            title:'Error!'
                        });
                    }
                },
                function(err){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template:'Error validando proyecto',
                        title: 'Error!'
                    });
                }
            )}

/* ARREGLAR, controlador para iniciar sesion si el dispositivo ya recuerda la sesion de este proyecto
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
        });*/

    })

    .controller('RegistroCtrl', function($scope, $http, $state, $ionicLoading, $ionicPopup) {
        $scope.proyecto={};
        $scope.registro= function(){
            var url= "https://proyectoscrumboard.azure-mobile.net/tables/Proyectos";

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
                        template:'Proyecto Creado',
                        title:'Exito!'
                    });

                    $state.go("noLogin.login");

                }
                ,
                function(err){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template:'Error en creaccion',
                        title:'Error!'
                    });
                }
            );
        }

    });
//Código para llamar al modal de proyecto
angular.module('testApp', ['ionic'])
    .controller('ProyectoCtrl', function($scope, $ionicModal) {
        $ionicModal.fromTemplateUrl('modal-proyecto.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
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
