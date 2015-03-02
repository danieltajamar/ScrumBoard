//var fecha = new Date();
//console.log(mensaje + " ejecutado el " + fecha.getDate() + " del " + fecha.getMonth()  + " de " + fecha.getFullYear());

//angular.module('starter.services', [])

  /*  .factory('Bbdd',function($q){

        var busqueda;

        //Funcion para crear la base de datos
        var db = openDatabase("Bbdd", "", "Base Tareas", 1024 * 1024,
            function (db) {
                db.transaction(function (tx) {
                        tx.executeSql(
                            "create table if not exists Tareas " +
                            "(Id integer primary key autoincrement, " +
                            "Nombre text, " +
                            "Descripcion text," +
                            "Fecha date," +
                            "Prioridad text," +
                            "Estado text)" );
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


            addTarea:function(producto){

                var db = openDatabase("Bbdd", "", "Base Tareas", 1024 * 1024);

                db.transaction(function (tx) {

                    tx.executeSql("insert into Tarea"+
                        " (Nombre,Precio) values(?,?)",
                        [producto.nombre, producto.precio]
                    );
                });

            },
            buscarProducto:function(nombre){
                var db = openDatabase("Productos", "", "Base productos",
                    1024 * 1024);

                var deferred=$q.defer();

                db.transaction(function(tx){

                    tx.executeSql("select * from Producto where nombre"+
                        " like ?",["%"+nombre+"%"],

                        function(tran,res){

                            var productos=[];

                            for(var i=0;i<res.rows.length;i++){
                                var o={
                                    id:res.rows.item(i).id,
                                    nombre:res.rows.item(i).nombre,
                                    precio:res.rows.item(i).precio

                                };
                                productos.push(o);

                            }


                            deferred.resolve(productos);

                        },
                        function(tran,err){
                            deferred.reject(err);

                        }
                    );



                });
                return deferred.promise;



            }

        }





    });
*/