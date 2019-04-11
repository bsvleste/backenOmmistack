const express = require('express');
const Box = require('../model/Box');
const File = require('../model/File');
const router = express.Router();

router.post('/create',async(req,res)=>{

    const box = await Box.create({title:"Fotos Carnaval"});

    return res.json(box);
});

router.get('/boxs',async(req,res)=>{
    const lista = await Box.find().populate({
        path:'file',
        options:{sort:{createdAt:-1}}
    });
    return res.json(lista);
});
module.exports = app=>app.use('/box',router);