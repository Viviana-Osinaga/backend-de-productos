const {createApp} = Vue;   //importamos el modulo createApp de Vuejs

createApp({
    data(){             //Sirve para definir los atributos que necesitamos
        return{
            productos: [],      //Lista de productos inicializada en cero
            url: 'http://127.0.0.1:5000/productos',     //url de la api
            cargando: true,         //Cundo los está buscando, es true porq en principio los busca
            error: false        //Por si no encuentra los datos de la api, en principio va ser false. si no encuentra se vuelve true
        }
    },

    methods: {         //Aquí definimos los métodos que necesitamos ej; para eliminar, para consultar a la api para mostrar todos los prductos

        fetchApi(url){              //Consultar a la api todos nuestros productos para poder mostrarlos en nuestra tabla. Se ejecuta en created()
            fetch(url)              //tambien puede ser (this.url)
            .then(res => res.json())    //Respond=res  combierte lo que trajo en formato json
            .then(data =>{              //manipulamos los datos
                this.productos = data;      //Trae los datos y los guarda en productos
                this.cargando = false;      //Ya trajo todos los productos, no está cargando nada
            })
            .catch(err=>{               //Agarra los errores
                console.error(err);     //Muestra el error por pantalla, es igual al console.log pero en rojo.
                this.error = true;      // Hubo un error entonces se pasa a true
            })
        },

        eliminar(id){
            const url = this.url+"/"+id     //= 'http:127.0.0.1:5000/productos' + '/' + id  =>estamos concatenando strings
            let options = {
                method: 'DELETE'
            }

            fetch(url,options)
            .then(res => res.json())    //siempre se transforma en json
            .then(data =>{          //no se termina usando la data.
                location.reload();  //recarga la pagina sin el objeto eliminado, dueño del id que usamos
            })
            .catch(err => console.error(err))
        }
    },

    created(){                  //Se ejecurá cuando me pidan por el navegador entrar del index.html a /productos
        this.fetchApi(this.url);
    }
    
}).mount('#app')    //Le decimos sobre qué estiqueta vamos a trabajar