const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    apellidoPaterno: {
        type: String,
        required: true
    },
    apellidoMaterno: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    claveElector: {
        type: String,
        required: true,
        unique: true
    },
    curp: {
        type: String,
        required: true,
        unique: true
    },
    fechaNacimiento: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    municipio: {
        type: String,
        required: true
    },
    localidad: {
        type: String,
        required: true
    },
    seccion: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }

});

module.exports = model('Usuario', UsuarioSchema);