angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope,$ionicLoading,$ionicPopup, $state,$ionicPlatform,Proyectos) {
        $scope.proyecto={};

        $scope.iniciarSesion=function(){
            $ionicLoading.show(
                {
                    template:'Validando Proyecto...'

                });

            Proyectos.validarProyecto($scope.proyecto).then(
                function(res){
                    $ionicLoading.hide();
                    if(res.length>0) {
                        localStorage.proyecto = JSON.stringify(res[0]);
                         $state.go("tasks.todo");
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
                        template:'Error al validar proyecto',
                        title: '¡Error!'
                    });
                });
        };

        /*
         $ionicPlatform.ready(function(){
         if(localStorage.proyecto){
         $scope.proyecto=JSON.parse(localStorage.proyecto);
         if(Conexion.getEstado()){
         $scope.iniciarSesion();
         }

         else
         {
         $state.go("tab.blocs");


         }
         }

         });
         */
    })
    .controller('RegistroCtrl', function($scope, $http, $state, $ionicLoading, $ionicPopup) {

        $scope.proyecto={};
        $scope.registro=function(){
            var url= "https://proyectoscrumboard.azure-mobile.net/tables/Proyectos";
            $http.defaults.headers.common = {
                'X-ZUMO-APPLICATION': 'JvrxlvWbdurQYUkRlACFMOcXBFbrtD91',
                'Access-Control-Allow-Origin': '*'

            };

            $ionicLoading.show(
                {
                    template:'Creando Proyecto...'

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
                        template:'El proyecto ya existe',
                        title: '¡Error!'

                    });

                }

            );

        }

    })

    .controller('TareasCtrl', function($scope,Tareas,Bbdd,Conexion) {

        $scope.tareas=[];

        var pr=JSON.parse(localStorage.proyecto);


        if(Conexion.getEstado()){

            Tareas.getTareas(pr.id).then(function(res){

            $scope.tareas=res;
            Bbdd.guardarTareas(res);


        },
        function(err){
            alert(err);

        });

        }

        else{

            Bbdd.obtenerTareas().then(function(res){

                $scope.tareas=res;

            },function(err){

                alert(err);

            });
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
