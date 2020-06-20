const express = require('express');
const usersController = require('./controllers/usersController')
const postsController = require('./controllers/postsController')
const loginMiddleware = require('./middlewares/login')
const vehiclesController = require('./controllers/vehiclesControllers')
const routes = express.Router();

// Users
routes.post('/register', usersController.create );
routes.get('/register', loginMiddleware.required , usersController.index ); // listar usuários
routes.post('/login', usersController.login );

// Vehicles
routes.post('/vehicles/register' ,loginMiddleware.required , vehiclesController.create);
routes.get('/vehicles', vehiclesController.index);
routes.get('/vehicles/:id',loginMiddleware.required, vehiclesController.indexOne);

//Companies
routes.post('/posts', postsController.create );
routes.get('/posts', postsController.index );
routes.put('/posts/:id', postsController.put );
routes.delete('/posts/:id', postsController.delete );


module.exports = routes