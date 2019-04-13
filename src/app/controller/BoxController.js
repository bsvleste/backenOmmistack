const express = require('express');
const Box = require('../model/Box');
const File = require('../model/File');
const router = express.Router();

router.post('/create',async(req,res)=>{

    const box = await Box.create(req.body);

    return res.json(box);
});

router.get('/find/:id',async(req,res)=>{
    const lista = await Box.findById(req.params.id).populate({
        path:'file',
        options:{sort:{createdAt:-1}}
    });
    return res.json(lista);
});

module.exports = app=>app.use('/box',router);