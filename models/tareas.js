const colors = require('colors/safe');
const Tarea = require("./tarea");


class Tareas{

    _listado={};

    get listadoArr(){
        const listado=[]
        Object.keys(this._listado).forEach(key=>{
            listado.push(this._listado[key])
        })

        

        return listado
    }

    constructor(){
        this._listado={};
    }

    crearTarea(desc = ''){
        const tarea= new Tarea(desc)
        this._listado[tarea.id]=tarea;
    }

    cargarTareas (tareas = ""){

        
        tareas.forEach(tarea=>{
            this._listado[tarea.id]=tarea
        })
    }

    listadoCompleto(){

       
        console.log('')
        this.listadoArr.forEach((key, i)=>{
            const {desc, completadoEn}=key;
            const ix = i+1;
            const texto=`${(completadoEn)?colors.green(ix+'.'):colors.red(ix+'.')} ${desc} :: ${(completadoEn)?'completado'.green:'peniente'.red}`
            console.log(texto)
           
        })



    }

    listadoPendientesCompletad( compl = true ){

        console.log('')
        this.listadoArr.forEach(( key, i )=>{
            const { desc, completadoEn }=key;
            const ix = i+1;
            const texto=`${(completadoEn)?colors.green(ix+'.'):colors.red(ix+'.')} ${desc} ${(completadoEn)?completadoEn.green:'peniente'.red}`
            if( !completadoEn && !compl ){
                console.log(texto)

            }
            if( completadoEn && compl ){
                
                console.log(texto)
            }
           
        })
    }

    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    toggleTarea(ids=[]){


        ids.forEach(id=>{
            const tarea= this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn= new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn=null;
            }
        })

    }

   

}


module.exports=Tareas;