'use strict';
const db = require('../../models');
const { WorkOrder, Consortium, Administration, ServiceType, User, Quote, Attachment } = db;

// POST /api/work-orders - Crear una nueva orden de trabajo
exports.create = async (req, res) => {
    try {
        const { work_date, summary, status, consortiumId, serviceTypeId, technicianId, quoteId } = req.body;
        if (!work_date || !consortiumId || !serviceTypeId) {
            return res.status(400).send({ message: 'Fecha, consorcio y tipo de servicio son requeridos.' });
        }
        const newWorkOrder = await WorkOrder.create({ work_date, summary, status, consortiumId, serviceTypeId, technicianId, quoteId });
        res.status(201).json(newWorkOrder);
    } catch (error) {
        console.error("Error al crear orden de trabajo:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// GET /api/work-orders - Obtener todas las órdenes de trabajo
exports.findAll = async (req, res) => {
    try {
        const workOrders = await WorkOrder.findAll({
            include: [
                { model: ServiceType, as: 'serviceType' },
                { model: User, as: 'technician', attributes: ['id', 'name'] },
                { model: Consortium, as: 'consortium', include: [{ model: Administration, as: 'administration', attributes: ['name'] }] }
            ],
            order: [['work_date', 'DESC']]
        });
        res.status(200).json(workOrders);
    } catch (error) {
        console.error("Error al obtener órdenes de trabajo:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// POST /api/work-orders/:id/attachments - Subir una imagen para una orden de trabajo
exports.addAttachment = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'No se ha subido ningún archivo.' });
        }

        const workOrderId = req.params.id;
        const workOrder = await WorkOrder.findByPk(workOrderId);
        if (!workOrder) {
            return res.status(404).send({ message: 'Orden de trabajo no encontrada.' });
        }

        // Guardamos la referencia del archivo en la base de datos
        const newAttachment = await Attachment.create({
            file_path: req.file.path, // multer nos da la ruta del archivo guardado
            description: req.body.description || 'Sin descripción',
            workOrderId: workOrderId
        });
        
        res.status(201).json(newAttachment);
    } catch (error) {
        console.error("Error al añadir adjunto:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// Podríamos añadir aquí findOne, update, delete...