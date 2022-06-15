const inquirer = require('inquirer')
require('colors')

const menuOpt=[
    {
        type:'list',
        name: 'opcion',
        message: 'que desea hacer?',
        choices:[
            {
                value:'1',
                name:`${ '1.'.green } Crear tarea`
            },
            {
                value:'2',
                name:`${ '2.'.green } Listar tareas`
            },
            {
                value:'3',
                name:`${ '3.'.green } Listar tareas completadas`
            },
            {
                value:'4',
                name:`${ '4.'.green } Listar tareas pendientes`
            },
            {
                value:'5',
                name:`${ '5.'.green } Completar tareas`
            },
            {
                value:'6',
                name:`${ '6.'.green } Borrar tareas`
            },
            {
                value:'0',
                name:`${ '0.'.green } Salir \n`
            },
            
        ]
    }
]


const menuPause=[{
    type:'input',
    name:'pause',
    message:`\nPresione ${'ENTER'.blue} para continuar\n`
}]



const inquirerMenu = async() =>{

    console.clear()
    console.log("=============================".rainbow)
    console.log("   Seleccione una opcion".green)
    console.log("=============================\n".rainbow)
    


    const {opcion} = await inquirer.prompt(menuOpt)


    return opcion;

}

const inquirerPause = async() =>{

    console.log('\n')
    return await inquirer.prompt(menuPause)
}


const inquirerLeer = async(message) =>{
    const question= [
        {
            type:'input',
            name:'desc',
            message,
            validate( value ){
                if( value.length === 0  ){
                    return 'introduce un valor'
                }
                return true
            }
        }
    ]

    const {desc}  = await inquirer.prompt(question)

    return desc 
}

const listar = (tareas) => {
    const choices = tareas.map((tarea, i)=>{
        
        const idx= i+1;
        
        return {
            value: tarea.id,
            name:`${(idx+'.').green} ${tarea.desc}`
        }
    })
    
    return choices
}


const listadoBorrar = async(tareas)=>{

   

   const choices = listar(tareas)

   choices.unshift({
    value:'0', 
    name:`${'0.'.green} Cancelar`
    })

    const pregunta = [
        {
            type: 'list',
            name: 'id',
            choices
        }
    ]

    const {id} = await inquirer.prompt(pregunta);

    return id
    


}

const inquirerCompletar = async ( tareas )=>{

    const choices = tareas.map((tarea, i)=>{
        
        const idx= i+1;
        
        return {
            value: tarea.id,
            name:`${(idx+'.').green} ${tarea.desc}`,
            checked: (tarea.completadoEn)?true:false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'id',
            choices
        }
    ]

    const {id} = await inquirer.prompt(pregunta);

    return id


}

const inquirerConfirmar = async(message) =>{
    const question= [
        {
            type:'confirm',
            name:'confirmacion',
            message,
            
        }
    ]

    const {confirmacion}  = await inquirer.prompt(question)

    return confirmacion 
}




module.exports = {
    inquirerMenu,
    inquirerPause,
    inquirerLeer,
    listadoBorrar,
    inquirerConfirmar,
    inquirerCompletar
}