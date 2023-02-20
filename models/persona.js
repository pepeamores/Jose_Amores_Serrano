const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personaSchema = new Schema({
    Nombre: String,
    Apellido: String,
    Dni: String,
    Edad: String,
    Patologia: String,
    Ciudad: String,
    Domicilio: String
})

const Persona = mongoose.model('persona', personaSchema, "persona");

module.exports = Persona;