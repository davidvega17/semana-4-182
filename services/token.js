var jwt = require('jsonwebtoken');
const db = require('../models');
const key = require('../secret/config.js')

module.exports = {

    //generar el token
    encode: async(user) => {
        var token = jwt.sign(
            {   id: user.id,
                name: user.name,
                email: user.email,
                rol: user.rol,
                status: user.estado
            },
            key.secret,
            {
            expiresIn: 86400
        });
        return token;
    },
    //permite decodificar el token
    decode: async(token) => {
        try {
            console.log(token);
            const {id} = await jwt.verify(token, key.secret);
            console.log(id);
            const user = await db.Usuario.findOne({where:{
                id: id,
                estado: 1
            }});
            if(user){
                console.log(user);
                return user;
            }else{
                return false;
            }
        } catch (e) {
            console.log(e);
        }

    }
}