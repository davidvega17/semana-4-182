//Middleware de autenticacion;
const tokenService = require('../services/token');

module.exports = {
    verifyUsuario: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == 'Administrador' || response.rol == 'Vendedor' || response.rol == 'Almacenero') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    
}

module.exports = {
    verifyAdmininstrador: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol === 'Administrador') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    
}

module.exports = {
    verifyVendedor: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol === 'Vendedor') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    
}

module.exports = {
    verifyAlmacenero: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol === 'Amacenero') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    
}