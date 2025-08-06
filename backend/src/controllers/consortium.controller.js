'use strict'
const db = require('../../models');
const { Consortium, Administration } = db;

//POST /api/consortiums - Crear un nuevo consorcio
exports.create = async (req, res) =>{
    try{
        const{name, address,administrationId} = req.body;
        if(!name||!address||!administrationId){
            return res.status(400).send({message:'Nombre, dirección y ID de administración son requeridos.'
            });
        }
        const newConsortium = await Consortium.create({
            name, address, administrationId
        });
        res.status(201).json(newConsortium);
    }catch(error){
        console.error("Error al crear consorcio.",error);
        res.status(500).json({
            message: 'Error en el servidor.'
        });
    }
};

// GET /api/consortiums - Obtener todos los consorcios
exports.findAll = async (req, res) => {
    try {
        const consortiums = await Consortium.findAll({
            // CORREGIDO: Usamos el objeto del modelo en el include
            include: [{
                model: Administration,
                as: 'administration' // Usamos el alias definido en el modelo Consortium
            }],
            order: [['name', 'ASC']]
        });
        res.status(200).json(consortiums);
    } catch (error) {
        console.error("Error al obtener consorcios:", error); // Añadimos log para ver el error
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

//...Aqui podemos añadir findOne, update y delete... como rutas separadas
exports.findOne = async (req, res) => {
    try {
        const consortium = await Consortium.findByPk(req.params.id, {
            include: ['administration']
        });
        if (!consortium) return res.status(404).send({ message: 'Consorcio no encontrado.' });
        res.status(200).json(consortium);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};