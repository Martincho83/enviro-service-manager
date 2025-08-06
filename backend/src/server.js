require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('../models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API del sistema Help Desk.' });
});

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const administrationRoutes = require('./routes/administration.routes');
const consortiumRoutes = require('./routes/consortium.routes');
const quoteRoutes = require('./routes/quote.routes');
const workOrderRoutes = require('./routes/workorder.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/api/administrations', administrationRoutes);
app.use('/api/consortiums', consortiumRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/work-orders', workOrderRoutes);

const PORT = process.env.PORT || 8080;

// --- FUNCIÓN DE CONEXIÓN CON REINTENTOS ---
const connectWithRetry = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      await db.sequelize.authenticate();
      console.log('Conexión con la base de datos establecida exitosamente.');
      return; // Si tiene éxito, salimos de la función
    } catch (error) {
      retries--;
      console.error(`No se pudo conectar a la base de datos. Reintentando en ${delay / 1000} segundos... (${retries} intentos restantes)`);
      if (retries === 0) {
        console.error('No se pudo establecer conexión con la base de datos después de varios intentos.', error);
        process.exit(1); // Si se acaban los intentos, detenemos la aplicación
      }
      // Esperamos un tiempo antes del siguiente reintento
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

// --- INICIAR EL SERVIDOR Y LA CONEXIÓN ---
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
  // Llamamos a nuestra nueva función de conexión robusta
  await connectWithRetry();
});