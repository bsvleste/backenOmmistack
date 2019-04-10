//lib dotenv para configurar variaveis de ambiente no arquivo .env
require('dotenv').config();

//importa as dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//inicializa o express
const app = express();
//abilita o socket io
const server  = require('http').Server(app);
const io = require('socket.io')(server);
//define a porta para rodar o servidor
const  porta = process.env.PORT || 3000;
//conexão com o mongodb 
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true
});
/* inicializa o real time */
app.use((req,res,next)=>{
    req.io = io;
    return next();
});
app.use(cors());
app.use(express.json());

//controla as rotas 
require('./app/controller/index')(app);

//inicializa o servidor
server.listen(porta,()=>{console.log('estamos no ar');});
