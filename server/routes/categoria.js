const express = require('express');
const { verificaToken, verificaAdminRole } = require('./../middlewares/autenticacion');
const app = express();
const Categoria = require('./../models/categoria');

// ============================================
// Mostrar todas las categorias
// ============================================
app.get('/categorias', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            })
        });
});

// ============================================
// Mostrar una categoria por id
// ============================================
app.get('/categorias/:id', verificaToken, (req, res) => {
    const { id } = req.params;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// ============================================
// Crear una categoria
// ============================================
app.post('/categorias', verificaToken, (req, res) => {
    const { descripcion } = req.body;
    const categoria = new Categoria({
        descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// ============================================
// Editar una categoria
// ============================================
app.put('/categorias/:id', verificaToken, (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;

    Categoria.findByIdAndUpdate(id, { descripcion }, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });
});

// ============================================
// Eliminar una categoria (Fisicamente)
// ============================================
app.delete('/categorias/:id', [verificaToken, verificaAdminRole], (req, res) => {
    const { id } = req.params;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada'
        });
    });
});

module.exports = app;