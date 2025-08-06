'use strict';
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Guardamos los archivos en la carpeta 'uploads' que creamos
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Creamos un nombre de archivo único para evitar colisiones
        // Ej: 20250805123000_imagen_tanque.jpg
        const uniqueSuffix = Date.now() + '_' + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('¡Solo se permiten archivos de imagen!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // Límite de 5MB por archivo
    }
});

module.exports = upload;