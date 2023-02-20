const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accionSchema = new Schema({
    Fecha_Realicacion: String,
    Estado: String,
    Descripcion: String,
    Lugar: String
})

const Accion = mongoose.model('accion', accionSchema, "accion");

module.exports = Accion;