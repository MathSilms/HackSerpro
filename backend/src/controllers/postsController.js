const connection = require('../database/connection');

module.exports = {
    async create( req, res ) {
        const { title, description, category } = req.body
        const id_user = req.headers.authorization;
        const name = await connection('posts').where('id_user',id_user).select('id_user').first()
        
        if(name){
            await connection('posts').insert({
                id_user,
                title,
                description,
                category,
            });
    
        } else {
            return res.status(401).json('usuário não autorizado!')
        }
        
        return res.status(201).json({ id_user, title, description, category });
    },

    async index( req, res ) {
        const posts = await connection('posts').select('*')
        return res.json ( posts)
    },

    async delete( req , res ){
        const user = req.headers.authorization;
        const { id } = req.params;

        const id_user = await connection.select('nickName').from('users').where('nickName', user).first();
        
        
        if ( id_user ) {

            await connection.select('*').from('posts').where('id', id ).first().delete();
            
            return res.status(207).json('post deletado!');

        } else {
            return res.status(401).json('Você não tem autorização para deleter este post!')
        }
       
        
        

       
    },

    async put ( req, res ) {
        const user = req.headers.authorization;
        const { id } = req.params;
        const {title, description, category } = req.body

        const id_user = await connection.select('nickName').from('users').where('nickName', user).first();
        
        if(id_user){
            await connection
        .select('*')
        .from('posts')
        .where('id', id)
        .first().update({
            title,
            description,
            category,
        })
            return res.status(202).json('alteração feita com sucesso!')

        } else {

            return res.status(401).json('voce não tem auteração para efetuar alterações!')

        }
    }
}