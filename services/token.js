var jwt = require('jsonwebtoken');
const models = require('../models');
const key = require('../secret/config.js')


const checkToken = (token) => {
    let localId = null;
    try {
        const{id} = token.decode(token);
        localId = id;
    } catch (error) {
        
    }
    const user = models.user.findOne({where:{
        id: id,
        estado: 1
    }});
    if(user){
        const token = encode(user);
        return{
            token,
            rol: user.rol
        }
    }else{
        return false;
    }
};

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
            const {id} = await jwt.verify(token, key.secret);
            const user = await models.user.findOne({where:{
                id: id,
                estado: 1
            }});
            if(user){
                return user;
            }else{
                return false;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }

    }
}