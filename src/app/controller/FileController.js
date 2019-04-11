const express = require('express');
const Box = require('../model/Box');
const File = require('../model/File');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

router.post('/create/:id/files',multer(multerConfig).single('file'),async(req,res)=>{
    const box = await Box.findById(req.params.id);

    const file = await File.create({
        title:req.file.originalname,
        path:req.file.key
    });

    box.file.push(file);

    await box.save();

    req.io.sockets.in(box._id).emit('file',file);
     
    return res.json(file);
});

module.exports = app=>app.use('/file',router);