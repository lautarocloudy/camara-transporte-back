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
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://camara-de-transportistas-unidos-ar.netlify.app/',  // Dominio de producción
      'http://localhost:3000',          // Localhost para desarrollo
      'null0',
      'http://127.0.0.1:5173'                            // Permite el origen 'file://'
    ];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Si el origen está en la lista o no hay origen (por ejemplo, en solicitudes 'file://')
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
  credentials: true // Habilita las credenciales
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
