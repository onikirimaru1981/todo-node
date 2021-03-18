require('colors');


const readline = require('readline');

const mostrarMenu = () => {// si necesitaramos trabajar con el await transformariamos  la funcion en async,pero en este caso lo que necesitamos
    // es trabajar con el resolve en una parte concreta del codigo,asi que tranformamos esta funcion en una promesa

    return new Promise((resolve => {

        console.clear();
        console.log('============================'.green);
        console.log('   Seleccione una opción  '.green);
        console.log('============================\n'.green);

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listas tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir\n`);

        //Recibir informacion del usuario
        const rl = readline.createInterface({// El paquete readline ya viene por defecto en node
            input: process.stdin,// Con esto le decimos a node que pause el programa hasta que el usuario introduzca algun caracter y le de a Enter
            output: process.stdout// Con este codigo mostramos al usuario algun mensaje cuando introduce los carcteres solicitados

        });

        rl.question('Seleccione una opcion: ', (opt) => {

            rl.close();// es importe incluir este metodo porque sino el programa estara esperando hasta que ejecutemos el readline.close
            resolve(opt);// gracias a que utilizamos una promesa,podemos utilizar el metodo resolve para devolver la opcion seleccionada por el usuario

        });



    }));




};

// Pausa de ventana
const pausa = () => {  //Mismo proceso con esta funcion,la transformamos en promesa para utilizar el resolve,no utilizamos el reject porque no barajamos que ocurra un error

    return new Promise((resolve) => {
        const rl = readline.createInterface({

            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Presione ${'ENTER'.green} para continuar:`, (opt) => {

            rl.close();
            resolve();// Resolve de esta promesa
        })



    })


}




module.exports = {

    mostrarMenu,
    pausa
}