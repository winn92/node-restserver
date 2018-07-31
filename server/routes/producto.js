const express = require('express');
const { verificaToken } = require('./../middlewares/autenticacion');

const app = express();
const Producto = require('./../models/producto');

// ====================================
// Obtener productos
// ====================================
app.get('/productos', verificaToken, (req, res) => {
    const desde = Number(req.query.desde) || 0;
    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            })
        })
});

// ====================================
// Buscar productos
// ====================================
app.get('/productos/buscar/:termino?', verificaToken, (req, res) => {
    const { termino } = req.params;
    const regex = new RegExp(termino, 'i');
    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            })
        });
});

// ====================================
// Obtener un producto por ID
// ====================================
app.get('/productos/:id', ({ params: { id } }, res) => {
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        })
});


// ====================================
// Crear un nuevo producto
// ====================================
app.post('/productos', verificaToken, ({ body, usuario }, res) => {
    const { nombre, precioUni, descripcion, disponible, categoria } = body;
    const producto = new Producto({
        usuario: usuario._id,
        nombre,
        precioUni,
        descripcion,
        disponible,
        categoria
    });
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            producto: productoDB
        })
    });
});

// ====================================
// Actualizar un producto
// ====================================
app.put('/productos/:id', verificaToken, ({ body: { nombre, precioUni, categoria, disponible, descripcion }, params: { id } }, res) => {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            })
        }
        productoDB.nombre = nombre;
        productoDB.precioUni = precioUni || productoDB.precioUni;
        productoDB.categoria = categoria || productoDB.categoria;
        productoDB.disponible = disponible || productoDB.disponible;
        productoDB.descripcion = descripcion;

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoGuardado
            });
        });
    });
});

// ====================================
// Borrar un producto
// ====================================
app.delete('/productos/:id', verificaToken, ({ params: { id } }, res) => {
    //solo debemos desabilitarlo (disponible en false)
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        productoDB.disponible = false;
        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto borrado'
            });
        });
    });
});

module.exports = app;