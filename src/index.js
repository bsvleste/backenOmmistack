//lib dotenv para configurar variaveis de ambiente no arquivo .env
require('dotenv').config();

//importa as dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
//inicializa o express
const app = express();
//abilita o socket io
const server  = require('http').Server(app);
const io = require('socket.io')(server);
const  porta = process.env.PORT || 3000;

/* cria slara individuais para os arquivos */
io.on('connect',socket=>{
    socket.on('connectRoom',box=>{
        socket.join(box);
    })
})
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
app.use(express.urlencoded({ limit:'50mb', extended:true }));
app.use('/files',express.static(path.resolve(__dirname,'..','tmp')));
//controla as rotas 
require('./app/controller/index')(app);

//inicializa o servidor
server.listen(porta,()=>{});
