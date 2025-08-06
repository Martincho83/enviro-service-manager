'use strict';
const db = require('../../models');
const { Administration, Consortium } = db;

// POST /api/administrations - Crear una nueva administración
exports.create = async (req, res) => {
    try {
        const { name, cuit, contact_person, email, phone } = req.body;
        if (!name) return res.status(400).send({ message: 'El nombre es requerido.' });
        
        const newAdmin = await Administration.create({ name, cuit, contact_person, email, phone });
        res.status(201).json(newAdmin);
    } catch (error) {
        console.error("Error al crear administración:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// GET /api/administrations - Obtener todas las administraciones
exports.findAll = async (req, res) => {
    try {
        const admins = await Administration.findAll({
            include: [{ model: Consortium, as: 'consortiums' }],
            order: [['name', 'ASC']]
        });
        res.status(200).json(admins);
    } catch (error) {
        // Añade este log para ver el error
        console.error("Error al obtener administraciones:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// GET /api/administrations/:id - Obtener una administración
exports.findOne = async (req, res) => {
    try {
        const admin = await Administration.findByPk(req.params.id, {
            include: [{ model: Consortium, as: 'consortiums' }]
        });
        if (!admin) return res.status(404).send({ message: 'Administración no encontrada.' });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// PUT /api/administrations/:id - Actualizar una administración
exports.update = async (req, res) => {
    try {
        const admin = await Administration.findByPk(req.params.id);
        if (!admin) return res.status(404).send({ message: 'Administración no encontrada.' });
        
        await admin.update(req.body);
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// DELETE /api/administrations/:id - Eliminar una administración
exports.delete = async (req, res) => {
    try {
        const admin = await Administration.findByPk(req.params.id);
        if (!admin) return res.status(404).send({ message: 'Administración no encontrada.' });
        
        await admin.destroy();
        res.status(200).json({ message: 'Administración eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};