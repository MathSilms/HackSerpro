const jwt = require('jsonwebtoken');
const jwt_token = "efasd1234a";

exports.required = (req, res, next ) => {
        try { 
            const  token  = req.headers.authorization
            const decode = jwt.verify(token, jwt_token)
            req.usuario = decode
            next()

    } catch(err) {
        console.log(err)
        return res.status(401).json('Erro de autenticação');
    }
},

exports.optional = (req, res, next ) => {
        try { 
            const  token  = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, jwt_token)
            console.log(req.usuario)
            req.usuario = decode
            next()

    } catch(err) {
        console.log(err)
        next()
    }
};
