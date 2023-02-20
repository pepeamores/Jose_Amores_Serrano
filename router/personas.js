const express = require('express');
const Persona = require('../models/persona');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayPersonaDB = await Persona.find();
        console.log(arrayPersonaDB);
        res.render("personas", { 
            arrayPersona: arrayPersonaDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearpersonas', (req, res) => {
    res.render('crearpersonas'); //nueva vista que llamaremos Crear
})

 
 router.post('/', async (req, res) => {
     const body = req.body //Gracias al body parser, de esta forma
     //podremos recuperar todo lo que viene del body
     console.log(body) //Para comprobarlo por pantalla
     try {
         const personaDB = new Persona(body) //Creamos un nuevo Pokemon, gracias al modelo
         await personaDB.save() //Lo guardamos con .save(), gracias a Mongoose
         res.redirect('/personas') //Volvemos al listado
     } catch (error) {
         console.log('error', error)
     }
})
module.exports = router;
module.exports = router;