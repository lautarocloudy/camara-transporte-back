const mongoose = require("mongoose");


const conexion = async()=>{

    try{

        
       await mongoose.connect("mongodb+srv://lautarorcloudy:1lnVJX70VJZzwiSA@cluster0.onkjrgt.mongodb.net/Cluster0");
       console.log("conectado correctamente");

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

module.exports={
    conexion
}

