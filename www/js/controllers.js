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

    })
    .controller('CrearTareaCtrl', function($scope, $http, $state, $ionicLoading, $ionicPopup) {

        $scope.tarea={};

        $scope.optionsPrioridad = [
            { label: 'Baja', value: 1 },
            { label: 'Media', value: 2 },
            { label: 'Alta', value: 3 }
        ];

        $scope.optionsEstado = [
            { label: 'Backlog', value: 1 },
            { label: 'To-Do', value: 2 },
            { label: 'In-Review', value: 3 },
            { label: 'Done!', value: 4 }
        ];

        $scope.crearTarea= function(){
            var url= "https://proyectoscrumboard.azure-mobile.net/tables/Tareas";

            $http.defaults.headers.common={
                'X-ZUMO-APPLICATION':'JvrxlvWbdurQYUkRlACFMOcXBFbrtD91',
                'Access-Control-Allow-Origin':'*'
            };

            $ionicLoading.show(
                {
                    template:'Creando Tarea'
                }
            );

            $http.post(url,$scope.tarea).then(
                function(res){
                    $scope.tarea.proyecto= JSON.parse(localStorage.proyecto);
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template:'Tarea Creada',
                        title:'Exito!'
                    });

                    $state.go("tasks.todo");

                }
                ,
                function(err){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template:'Problemas al crear Tarea',
                        title:'Error!'
                    });
                }
            );
        }
    });