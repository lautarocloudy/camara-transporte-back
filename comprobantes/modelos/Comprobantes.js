const { Schema, model} = require("mongoose");

const ComprobanteSchema = new Schema({
    nombreEmpresa: { type: String, required: [true, 'Error falta el campo username'], unique: true},
    facturaVentas: { type: String },
    facturaCompras: { type: String },
    reciboCobro: { type: String },
    reciboPago: { type: String },
    presupuesto: { type: String },
    prestamosPagar: { type: String },
    prestamosCobrar: { type: String },
    ordenPagoCobro: { type: String },
    pagare: { type: String },
    hojaMembretada: { type: String },
    informe: { type: String },
    informeDoc: { type: String },
    troquelado: { type: String },
    ordenPrestamoDevolucion: { type: String },
    archivoDocumentacion: { type: String },
    servicioAdministracion: { type: String },
    checkList: { type: String },
    informacion: { type: String },
    altaPersonal: { type: String }
})

module.exports = model("Comprobante", ComprobanteSchema, "comprobantes");