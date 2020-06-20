const connection = require('../database/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_token = "efasd1234a";
const axios = require('axios')


module.exports = {
    async create( req, res ) {

        const { name, email, password, cpf } = req.body;
        cpf.toString();
        
        const valid = await axios.post('https://apigateway.serpro.gov.br/datavalid-trial/v1/validate/pf',{
            cpf,
        })
        console.log(valid)
        const emails = await connection('users')
        .where('email', email)
        .select('email')
        .first();

        const cpfs = await connection('users')
        .where('cpf', cpf)
        .select('cpf')
        .first();

 // condições
        if(emails) {

             return res.status(406).json({ message: "email já cadastrado!"});
        }
        if(cpfs){
                return res.status(406).json({ message: "dados já definidos no sistema!"});  
            }

        bcrypt.hash(password, 10, async (err, password )=>{
            if(err){
                return res.status(500).json(`error:${err}`)  
            }

            await connection('users').insert({
                name,
                email,
                password,
                cpf
            });
           
        })

        
        return res.status(201).json( {message:"Cadastro bem sucedido !"})
            

           
     },
     
     async index( req, res ) {
        const users = await connection('users').select('*')
        return res.json( users )
     },

     async login( req, res ) {
        const { email, password } = req.body

        const user = await connection('users')
        .where('email', email)
        .select('*')
        .first()

        if(!user){
            return res.status(401).json('erro de autenticação');
        }

        const result = await bcrypt.compareSync(password, user.password)

        if(result) {
            const token = jwt.sign({
                id:user.id,
                name:user.name
            }, jwt_token, {
                expiresIn:"1h"
            });

            return res.status(200).json({message:'autenticação efetuada com sucesso!',token })
        }
     }
}