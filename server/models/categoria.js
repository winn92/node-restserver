const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const categoriaSchema = new Schema({
    descripcion: {
        //unique: true,
        type: String,
        required: [true, 'El descripcion es necesario']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Usuario es necesario']
    },
});

//categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Categoria', categoriaSchema);