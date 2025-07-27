const express = require('express');
const router = express.Router();
const InteraccionControlador = require('../cliente/controladores/Interaccion'); // Controlador de interacciones
const middlewares = require('../middlewares/auth'); // Middleware de autenticación

// Rutas de interacciones
router.post("/crear", middlewares.auth, InteraccionControlador.crearInteraccion); // Crear una interacción
router.put("/editar/:id", middlewares.auth, InteraccionControlador.editarInteraccion); // Actualizar una interacción
router.get("/listar", middlewares.auth, InteraccionControlador.mostrarInteracciones); // Listar todas las interacciones
router.get("/cliente/:clienteId", middlewares.auth, InteraccionControlador.mostrarInteraccionesPorCliente); // Buscar interacciones por cliente

module.exports = router;
