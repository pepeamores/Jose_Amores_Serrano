const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const centroSchema = new Schema({
    Nombre: String,
    Ciudad: String,
    Codigo_Postal: String
})

const Centro = mongoose.model('centro', centroSchema, "centro");

module.exports = Centro;