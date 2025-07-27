const Comprobante = require('../modelos/Comprobantes')

const crear = (req, res) => {

    //recoger todos los datos de post
    let parametros = req.body;

    //crear el objeto a guardar
    const comprobante = new Comprobante(parametros);

    //guardar articulo en la base de datos
    comprobante.save((error, comprobanteGuardado) => {

        if (error || !comprobanteGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: 'no se ha guardado'
            });
        }

        //devolver el resultado
        return res.status(200).json({
            status: 'success',
            mensaje: 'se ha guardado la informacion',
            comprobanteGuardado
        });
    })

}

const editar = (req, res) => {

    let id = req.params.id;

    let parametros = req.body;



    Comprobante.findOneAndUpdate({ _id: id }, parametros, { new: true }, (error, comprobanteActualizado) => {

        if (error || !comprobanteActualizado) {
            console.log("sa")
            return res.status(500).json({
                status: "error",
                mensaje: "error al actualizar el articulo"
            });
        }

        return res.status(200).json({
            status: "success",
            empresa: comprobanteActualizado
        })
    })
}

const listar = (req, res) => {
    Comprobante.find()
         .sort({nombreEmpresa: 1})
        .exec((error, empresa) => {
            if (error || !empresa || empresa.length <= 0) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "no se ha encontrado ningun articulo"
                })
            }

            res.status(200).json({
                status: "success",
                empresa
            })
        })
}

const buscador= (req, res)=>{

    let busqueda = req.params.busqueda;

    Comprobante.find({"$or":[
        {"nombreEmpresa":{"$regex": busqueda, "$options": "i"}},

        
    ]})
        // .sort({fecha: -1})
        .exec((error, comprobante)=>{
            if(error || !comprobante || comprobante.length <= 0){
                return res.status(404).json({
                    status: "error",
                    mensaje: "no se ha encontrado ningun comprobante"
                })
            }

            res.status(200).json({
                status: "success",
                comprobante
            })
        })

}

const uno = (req, res) => {

    //recoger el id
    let id = req.params.id;

    //buscar articulos
    Comprobante.findById(id, (error, comprobante) => {

        if (error || !comprobante) {
            return res.status(404).json({
                status: "error",
                mensaje: 'no se ha podido encontrar datos'
            });
        }

        return res.status(200).json({
            status: "success",
            comprobante
        })

    })

}

module.exports = {
    crear,
    listar,
    editar,
    buscador,
    uno
}