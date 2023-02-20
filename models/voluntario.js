const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voluntarioSchema = new Schema({
    Nombre: String,
    Apellido: String,
    Ciudad: String,
    Domicilio: String,
    Dni: String,
    Edad: String,
    Formacion: String,
    Experiencia: String
})

const Voluntario = mongoose.model('voluntario', voluntarioSchema, "voluntario");

module.exports = Voluntario;