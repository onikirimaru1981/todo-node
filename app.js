require('colors');
const { guardarDB, leerDb } = require('./helpers/guardarArchivo');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');// demostracion de crear menu manualmente
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');




const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDb = leerDb();

    if (tareasDb) {// Cargar tareas
        tareas.cargarTareasFromArr(tareasDb);
    };



    // Con este ciclo conseguimos que cada vez que el usuario introduzca una opcion y le de a ENTER vuelvan a salir,y se limpie el terminal

    do {   // opt = await mostrarMenu();// Ya que tranformamos la funcion mostrarMenu en promesa,ahora podemos utilizar el await
        // Imprime menu
        opt = await inquirerMenu();// Utilizando el paquete inquire ,podemos crear un menu y que nos retorne la opcion

        switch (opt) {// Configurar opciones
            case '1':// crear tarea
                const desc = await leerInput('Descripcion:');// Utilizando el metodo leerInput
                tareas.crearTarea(desc)// Utilizando el metodo crearTarea
                console.log(desc);

                break;
            case '2':// Mostrar listado completo
                tareas.listadoCompleto();

                break;
            case '3':// Mostrar listado tareas completadas
                tareas.listarPendientesCompletadas(true);

                break;
            case '4':// Mostrar listado tareas pendientes
                tareas.listarPendientesCompletadas(false);

                break;
            case '5':// Completado|Pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);

                break;
            case '6':// Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);// En este caso ponemos el await dado que hasta que no tengamos el id nos podria dar un error de ejecucion
                // Opcion salir del menu
                if (id !== '0') {
                    // Confirmacion de si esta el usuario seguro de borrar
                    const ok = await confirmar('¿Estas seguro que deseas borrar la tarea?');// mensaje que le saldra al usuario antes de borrar una tarea
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log(`\nTarea ${'borrada'.red} correctamente`.green);
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);// despues de cada ejecucion se guardara en la db
        await pausa();// Pausa para el codigo


        // if (opt !== '0') await pausa()// podemos un await aqui,ya que sino nos limpiaria la consola y no veriamos nada,con el if conseguimos que al escribir 0,salga 
        // directamente si tener que presionar enter
    } while (opt !== '0');


    // pausa();

}
main();