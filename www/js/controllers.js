angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope, $state, $ionicLoading, $ionicPopup, Proyectos) {
        $scope.proyecto={};

        $scope.iniciarSesion=function(){

            $ionicLoading.show({
                template:'Validando proyecto'
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
                        template:'Error al validar proyecto',
                        title: 'Error!'
                    });
                }
            )};


/*
 //ARREGLAR, controlador para iniciar sesion si el dispositivo ya recuerda la sesion de este proyecto
        $ionicPlatform.ready(function(){
            if(localStorage.proyecto){
                $scope.proyecto=JSON.parse(localStorage.proyecto);
                if(Conexion.getEstado()){
                    $scope.iniciarSesion();
                }

                else
                {
                    $state.go("tasks.todo");

                }

            }
        });
*/
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
                        template:'El Proyecto ya exite, elige otro nombre',
                        title:'Error!'
                    });
                }
            );
        }

    });
    /*

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

 */
