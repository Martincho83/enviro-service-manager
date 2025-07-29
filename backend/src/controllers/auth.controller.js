const db = require('../../models');
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de Usuario
exports.register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Validación de campos
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'El email ya está en uso.' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Enviar respuesta exitosa (sin la contraseña)
        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        });

    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).send({ message: 'Ocurrió un error en el servidor.' });
    }
};

// Inicio de sesión de Usuario
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validación de campos
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
        }

        // Buscar al usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' });

        // Enviar respuesta exitosa (sin la contraseña)
        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            accessToken: token
        });

    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send({ message: 'Ocurrió un error en el servidor.' });
    }
};