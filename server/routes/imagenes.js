const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const { verificaTokenImg } = require('./../middlewares/autenticacion');

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    const { tipo, img } = req.params;
    const pathImagen = path.resolve(__dirname, `./../../uploads/${tipo}/${img}`);
    const noImagePath = path.resolve(__dirname + "./../assets/no-image.jpg");
    fs.existsSync(pathImagen) ? res.sendFile(pathImagen) : res.sendFile(noImagePath);
});

module.exports = app;