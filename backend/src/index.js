const express = require('express')
const routes = require('./routes')
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(routes);

app.listen(8888, ()=> console.log('servidor rodando na porta 8888!'))
 