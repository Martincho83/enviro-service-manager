'use strict';
const db = require('../../models');
const { Quote, Consortium, Administration } = db; // Importamos los modelos necesarios
const { buildQuotePDF } = require('../utils/pdfGenerator');

// POST /api/quotes - Crear un nuevo presupuesto
exports.create = async (req, res) => {
    try {
        const { quote_number, date, details, total_amount, status, consortiumId } = req.body;
        if (!quote_number || !date || !consortiumId) {
            return res.status(400).send({ message: 'Número, fecha y consorcio son requeridos.' });
        }
        const newQuote = await Quote.create({ quote_number, date, details, total_amount, status, consortiumId });
        res.status(201).json(newQuote);
    } catch (error) {
        console.error("Error al crear presupuesto:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// GET /api/quotes - Obtener todos los presupuestos
exports.findAll = async (req, res) => {
    try {
        const quotes = await Quote.findAll({
            include: [{
                model: Consortium,
                as: 'consortium',
                include: [{ // Anidamos el include para obtener también la administración
                    model: Administration,
                    as: 'administration',
                    attributes: ['id', 'name'] // Solo traemos los campos necesarios
                }]
            }],
            order: [['date', 'DESC']]
        });
        res.status(200).json(quotes);
    } catch (error) {
        console.error("Error al obtener presupuestos:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// GET /api/quotes/:id - Obtener un presupuesto por ID
exports.findOne = async (req, res) => {
    try {
        const quote = await Quote.findByPk(req.params.id, {
            include: [{
                model: Consortium,
                as: 'consortium',
                include: [{
                    model: Administration,
                    as: 'administration'
                }]
            }]
        });
        if (!quote) return res.status(404).send({ message: 'Presupuesto no encontrado.' });
        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// PUT /api/quotes/:id - Actualizar un presupuesto
exports.update = async (req, res) => {
    try {
        const quote = await Quote.findByPk(req.params.id);
        if (!quote) return res.status(404).send({ message: 'Presupuesto no encontrado.' });
        
        await quote.update(req.body);
        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// DELETE /api/quotes/:id - Eliminar un presupuesto
exports.delete = async (req, res) => {
    try {
        const quote = await Quote.findByPk(req.params.id);
        if (!quote) return res.status(404).send({ message: 'Presupuesto no encontrado.' });

        await quote.destroy();
        res.status(200).json({ message: 'Presupuesto eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// GET /api/quotes/:id/pdf - Generar PDF de un presupuesto
exports.generatePDF = async (req, res) => {
    try {
        const quote = await Quote.findByPk(req.params.id, {
            // Hacemos el mismo include que en findOne para tener todos los datos
            include: [{
                model: Consortium,
                as: 'consortium',
                include: [{
                    model: Administration,
                    as: 'administration'
                }]
            }]
        });

        if (!quote) {
            return res.status(404).send({ message: 'Presupuesto no encontrado.' });
        }

        // Establecer los encabezados de la respuesta para PDF
        const filename = `Presupuesto_${quote.quote_number}.pdf`;
        res.setHeader('Content-disposition', `inline; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        // Llamar a nuestra función de ayuda, pasándole el objeto 'quote' y el stream de respuesta 'res'
        buildQuotePDF(quote, res);

    } catch (error) {
        console.error(`Error al generar PDF para presupuesto ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error en el servidor al generar el PDF.' });
    }
};