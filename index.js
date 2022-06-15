require('colors')


const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const {inquirerMenu, inquirerPause, inquirerLeer, listadoBorrar, inquirerConfirmar, inquirerCompletar}= require('./helpers/inquirer')
const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')

// const {mostrarMenu, pausa} = require('./helpers/mensaje')


console.clear()

const main = async() =>{

    let opt=''

    const tareas = new Tareas()


    const tareaDB = leerDB()

    if (tareaDB){

        tareas.cargarTareas(tareaDB)

    }


    
    
    while (opt !='0') {


        
        opt= await inquirerMenu()
        
        switch (opt) {
            case '1':
                // crear opcion
                const desc = await inquirerLeer('Descripcion: ')
                tareas.crearTarea(desc)

                break;
            case '2':
                tareas.listadoCompleto()
                break;
            case '3':
                tareas.listadoPendientesCompletad()
                break;
            case '4':
                tareas.listadoPendientesCompletad(false)
                break;

            case '5':
                const ids = await inquirerCompletar(tareas.listadoArr)
                tareas.toggleTarea(ids)
                break;
            

            case '6':
                const id = await listadoBorrar(tareas.listadoArr)
                if(id !== '0'){
                    const conf= await inquirerConfirmar(`esta seguro que desea borrar esta tarea`);
                    if(conf){
                        tareas.borrarTarea(id)
                    }

                }
                break; 
        }

        guardarDB(tareas.listadoArr)


        await inquirerPause()
    }


    
    

}

main()