const jwt = require('jsonwebtoken');
const db = require('../../models');
const User = db.User;

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    
    if (!token) {
      return res.status(403).send({message: 'No se proporcionó un token.'});
    }
    
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({message: 'Token inválido.'});
      }
      req.userId = decoded.id;
      next();
    });
  };

  // Middleware para verificar el rol de usuario
const isAdmin = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.userId);
        if(user && user.role === 'admin'){
            next();
            return;
        }
        res.status(403).send({message: 'Acceso denegado. Se requiere rol de administrador.'});
    }catch(error){
        res.status(500).send({message: 'Error al verificar el rol de administrador.'});
    }
};

const authJwt = {
    verifyToken,
    isAdmin
};

module.exports = authJwt;
  

