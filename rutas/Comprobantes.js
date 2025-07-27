const express = require('express');
const router = express.Router();
const ArticuloControlador = require('../comprobantes/controladores/Comprobantes');
const middlewares = require('../middlewares/auth');

//rutas util
router.post("/crear", middlewares.auth, ArticuloControlador.crear);
router.get("/comprobantes", middlewares.auth, ArticuloControlador.listar);
router.put("/editar-comprobantes/:id", middlewares.auth, ArticuloControlador.editar);
router.get("/buscar/:busqueda", ArticuloControlador.buscador);
router.get("/comprobante-uno/:id", middlewares.auth, ArticuloControlador.uno);


module.exports = router;