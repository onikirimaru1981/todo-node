const { v4: uuidv4 } = require('uuid');
const Tarea = require('./tarea');
/**
 * _listado;
 *     { 'uuid-123434545-343434-2:{id:12,desc:asd,completadaEn:9256}'  }  Ejemplo de como se veria la tarea
 */

class Tareas {// creo la clase

    _listado = {// Propiedad listado
        'abc': 123
    };


    // Transformar objeto en areglo
    get listadoArr() {// Utilizando get para crear un nuevo areglo
        const listado = [];// Nuevo areglo

        // Codigo para extraer todas las llaves e incertarlas en el areglo

        Object.keys(this._listado).forEach(key => {// Utilizamos el forEach para barrer todas la llaves

            const tarea = this._listado[key]// Extraer la tarea instanciada

            listado.push(tarea)// incertar tarea en el areglo
        })

        return listado;// Retornar listado
    };

    constructor() {

        this._listado = {};
    };

    borrarTarea = (id = '') => {// Si existe el id borrar este del listado

        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArr = (tareas = []) => {

        tareas.forEach(tarea => {

            this._listado[tarea.id] = tarea;
        });

    }

    // Metodos

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);// instancia de tarea
        this._listado[tarea.id] = tarea;// codigo para agregar tareas dentro del objeto _listado
    };

    listadoCompleto = () => {
        console.log();

        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadaEn } = tarea;
            const estado = (completadaEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log(`${idx + '.'.green} ${desc} :: ${estado}`);

        })
        //1: en verde
        // completada: verde
        // pendiente:rojo

    };


    listarPendientesCompletadas = (completadas = true) => {
        console.log();
        let contador = 0;

        this.listadoArr.forEach(tarea => {

            const { desc, completadaEn } = tarea;


            const estado = (completadaEn)

                ? 'Completada'.green
                : 'Pendiente'.red;

            if (completadas) {
                // Mostrar completadas
                if (completadaEn) {
                    contador += 1;
                    console.log(`${contador.toString() + '. '.green}${desc} :: ${completadaEn.green}`);

                }

            } else {
                // Mostrar pendientes
                if (!completadaEn) {
                    contador += 1;
                    console.log(`${contador.toString() + '. '.green}${desc} :: ${estado}`);

                }
            }


        })


    };

    toggleCompletadas(ids = []) {// Nota,al declarar el argumento como un areglo vacio,hacemos que JS nos facilite metodos de este tipo
        // Codigo para marcar tareas completadas en pendientes
        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadaEn) {

                tarea.completadaEn = new Date().toISOString()// Con este metodo de la clase Date generto la fecha completa en forma de string
            }
        });
        // Codigo para marcar tareas completadas en pendientes
        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {

                this._listado[tarea.id].completadaEn = null;
            }

        })

    }



}

module.exports = Tareas

