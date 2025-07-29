const { conexion } = require("./BD/conexion");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Inicializar app
console.log("app de node arrancada");

// Conectar a la base de datos
conexion();

// Crear servidor node
const app = express();
const puerto = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://camara-de-transportistas-unidos-ar.netlify.app/',
  credentials: true,
  allowedHeaders: [
    'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'
  ],
  preflightContinue: false,
};

// Configurar CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Manejar solicitudes preflight globalmente

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}));

// Convertir body a objeto JS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar y usar rutas
const rutas_usuarios = require('./rutas/usuarios');
const comprobantes = require("./rutas/Comprobantes")
const clientes = require('./rutas/Clientes')
const interaccion = require("./rutas/Interaccion")
app.use("/api/user", rutas_usuarios);
app.use('/api/comprobantes', comprobantes);
app.use('/api/clientes',  clientes);
app.use('/api/interaccion',  interaccion);
// Crear servidor y escuchar peticiones
app.listen(puerto, () => {
  console.log("servidor corriendo en el puerto " + puerto);
});
