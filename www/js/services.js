// Backlog=1, To-do=2, In review=3, Done=4
// Baja=1, Media=2, Alta=3

angular.module('starter.services',[])

    .factory('Proyectos', function($http, $q){
        var url= "https://proyectoscrumboard.azure-mobile.net/tables/Proyectos";
        $http.defaults.headers.common = {
            'X-ZUMO-APPLICATION': 'JvrxlvWbdurQYUkRlACFMOcXBFbrtD91',
            'Access-Control-Allow-Origin': '*'

        };

        return{
            validarProyecto: function(proyecto){
                var query="?$filter=Nombre eq '"+proyecto.Nombre+"' and Password eq '"+proyecto.Password+"'";

                var request=$http({
                    url:url+query,
                    method:'get'
                });

                return request.then(ok,err);
            }
        };

        function ok(resp){
            return resp.data;
        }
        function err(resp){
            if(!angular.isObject(resp.data) || !resp.data.message){
                return($q.reject("Error desconocido"));
            }
            return ($q.reject(resp.data.message));
        }
    });
/*
    .factory('Tareas', function ($http, $q) {
        var url = "https://proyectoscrumboard.azure-mobile.net/tables/Tareas";
        $http.defaults.headers.common = {
            'X-ZUMO-APPLICATION': 'JvrxlvWbdurQYUkRlACFMOcXBFbrtD91',
            'Access-Control-Allow-Origin': '*'

        };

        return {
            getTareasPorProyecto: function (Proyecto) {
                var query = "?$filter=Proyecto eq '" + Proyecto + "'";
                var request = $http(
                    {
                        url: url + query,
                        method: 'get'

                    });

                return request.then(ok, err);

            }

        };

        function ok(resp) {
            return resp.data;

        }

        function err(resp) {
            if (!angular.isObject(resp.data) || !resp.data.message) {
                return ($q.reject("Error desconocido"));

            }
            return ($q.reject(resp.data.message));
        }
    })
    .factory('Conexion', function () {

        return {
            getEstado: function () {

                try {
                    /* var conn = navigator.connection.type;

                     if (conn == Connection.NONE || conn == Connection.UNKNOWN ||
                     conn == Connection.CELL)*//*
                     return false;

                } catch (e) {

                    alert(e.toString());
                }
            }

        }
    });*/
/*
    .factory('Bbdd',function($q){

        var busqueda;
        var fecha = new Date();

        //Funcion para crear la base de datos
        var db = openDatabase("Bbdd", "", "Base Tareas", 1024 * 1024,

            function (db) {

                db.transaction(function (tx) {

                        tx.executeSql("create table if not exists Proyectos" +
                        "(Nombre text, Contraseña text)");

                        tx.executeSql(
                            "create table if not exists Tareas " +
                            "(Id integer primary key autoincrement, " +
                            "Nombre text, " +
                            "Descripcion text," +
                            "Fecha date," +
                            "Prioridad integer," +
                            "Estado integer" +
                            "Proyecto text)" );
                    },

                    function (err) {

                        alert(err.toString());

                    });
            });

        return{

            setBusqueda:function(bus){

                busqueda=bus;
            },
            getBusqueda:function(){
                return busqueda;

            },

            guardarProyecto: function (Proyecto) {
                var db = openDatabase("Bbdd", "", "Base Tareas", 1024 * 1024);

                db.transaction(function (tx) {
                    tx.executeSql("delete from Proyectos");

                    for (var i = 0; i < Proyecto.length; i++) {

                        tx.executeSql("insert into Proyectos values(?,?)",
                            [Proyecto[i].Nombre, Proyecto[i].Contraseña]
                        );

                    }
                });
            },

            guardarTarea:function(Tarea, Proyecto){

                var db = openDatabase("Bbdd", "", "Base Tareas", 1024 * 1024);

                db.transaction(function (tx) {
                    tx.executeSql("delete from Tareas where Proyecto=?",[Proyecto]);

                        for (var i = 0; i < notas.length; i++) {
                            tx.executeSql("insert into Tarea (Nombre,Descripcion, Fecha, Prioridad, Estado, Proyecto) values(?,?,?,?,?,?)",
                                [Tarea.Nombre, Tarea.Descripcion, fecha, Tarea.Prioridad, Tarea.Estado, Tarea.Proyecto]
                            );
                        }
                });
            },

            buscarTareas:function(Proyecto, Estado){
                var db = openDatabase("Bbdd", "", "Base Tareas",1024 * 1024);

                var deferred=$q.defer();

                db.transaction(function(tx){

                    tx.executeSql("select * from Tareas where Estado=?",[Estado]," and Proyecto=?",[Proyecto],

                        function(tran,res){

                            var tareas=[];

                            for(var i=0;i<res.rows.length;i++){
                                var o={
                                    Id:res.rows.item(i).id,
                                    Nombre:res.rows.item(i).nombre,
                                    Descripcion:res.rows.item(i).Descripcion,
                                    Fecha:res.rows.item(i).Fecha,
                                    Prioridad:res.rows.item(i).Prioridad,
                                    Estado:res.rows.item(i).Estado,
                                    Proyecto:res.rows.item(i).Proyecto
                                };
                                tareas.push(o);

                            }

                            deferred.resolve(tareas);

                        },
                        function(tran,err){
                            deferred.reject(err);

                        }
                    );

                });
                return deferred.promise;

            }

        }
    }
    );
*/