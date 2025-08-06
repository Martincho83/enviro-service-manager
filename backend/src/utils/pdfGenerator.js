'use strict';
const PDFDocument = require('pdfkit');

function buildQuotePDF(quote, stream) {
    const doc = new PDFDocument({ margin: 50 });

    // Pipe el resultado del PDF al stream de respuesta
    doc.pipe(stream);

    // --- Encabezado del Documento ---
    doc.fontSize(20).text('Presupuesto de Servicios', { align: 'center' });
    doc.moveDown();

    // --- Información de la Empresa (datos de ejemplo) ---
    doc.fontSize(12).text('Servicios Ambientales S.A.', { align: 'left' });
    doc.text('C.U.I.T.: 30-12345678-9');
    doc.text('Dirección: Calle Falsa 123, Ciudad');
    doc.moveDown();

    // --- Información del Cliente ---
    const customerInfoX = 350;
    doc.text(`Presupuesto N°: ${quote.quote_number}`, customerInfoX);
    doc.text(`Fecha: ${new Date(quote.date).toLocaleDateString()}`);
    doc.moveDown();
    doc.text('Cliente:', { underline: true });
    doc.text(quote.consortium.administration.name);
    doc.text(`Consorcio: ${quote.consortium.name}`);
    doc.text(`Dirección: ${quote.consortium.address}`);
    doc.moveDown(2);

    // --- Tabla de Detalles ---
    doc.fontSize(14).text('Detalle de Servicios a Realizar', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(quote.details || 'No se especificaron detalles.');
    doc.moveDown(3);

    // --- Total ---
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .text(`Total: $ ${parseFloat(quote.total_amount).toFixed(2)}`, { align: 'right' });
    
    // --- Pie de Página ---
    doc.fontSize(10)
       .text('Presupuesto válido por 30 días.', 50, 700, { align: 'center', width: 500 });
       
    // Finalizar el PDF
    doc.end();
}

module.exports = { buildQuotePDF };