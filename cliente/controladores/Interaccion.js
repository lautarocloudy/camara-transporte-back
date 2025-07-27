const Interaccion = require('../modelo/Interaccion');

// Crear una interacción
const crearInteraccion = async (req, res) => {
    try {
        const nuevaInteraccion = new Interaccion(req.body);
        const interaccionGuardada = await nuevaInteraccion.save();
        res.status(201).json(interaccionGuardada);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la interacción', error });
    }
};

// Editar una interacción
const editarInteraccion = async (req, res) => {
    const { id } = req.params;
    try {
        const interaccionActualizada = await Interaccion.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // Devuelve el documento actualizado
        );
        if (!interaccionActualizada) {
            return res.status(404).json({ message: 'Interacción no encontrada' });
        }
        res.json(interaccionActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al editar la interacción', error });
    }
};

// Mostrar todas las interacciones
const mostrarInteracciones = async (req, res) => {
    try {
        const interacciones = await Interaccion.find().populate('clienteId');
        res.json(interacciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las interacciones', error });
    }
};

// Mostrar interacciones por cliente
const mostrarInteraccionesPorCliente = async (req, res) => {
    const { clienteId } = req.params;
    try {
        const interacciones = await Interaccion.find({ clienteId }).populate('clienteId');
        res.json(interacciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las interacciones del cliente', error });
    }
};

module.exports = {
    crearInteraccion,
    editarInteraccion,
    mostrarInteracciones,
    mostrarInteraccionesPorCliente
};
