const connection = require('../database/connection');

module.exports = {
    async create( req,res ){
        const { type, board } = req.body
        const user = req.usuario

        const boards = await connection('vehicles')
        .where('board', board)
        .select('board')
        .first();

        if (boards){
            return res.status(406).json('veículo já cadastrado!');
        }

        await connection('vehicles').insert({
            user_id:user.id,
            board,
            type
        })
        
        return res.status(200).json('Veículo cadastrado com sucesso!')
    },
    async index( req, res){
        const vehicles = await connection('vehicles').select('*');
        return res.status(200).json(vehicles);
    },
    async indexOne( req, res){
        const id = req.params.id
        const vehicles = await connection('vehicles')
        .where('user_id',id)
        .select('*');

        if(vehicles === '')
        {
            return res.json('você não possui veículos cadastrados!')
        }
        return res.json(vehicles);
        
    },
}