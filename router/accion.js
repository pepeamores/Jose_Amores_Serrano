const express = require('express');
const Accion = require('../models/accion');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayAccionDB = await Accion.find();
        console.log(arrayAccionDB);
        res.render("accion", { 
            arrayAccion: arrayAccionDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearaccion', (req, res) => {
    res.render('crearaccion'); //nueva vista que llamaremos Crear
})

 
 router.post('/', async (req, res) => {
     const body = req.body //Gracias al body parser, de esta forma
     //podremos recuperar todo lo que viene del body
     console.log(body) //Para comprobarlo por pantalla
     try {
         const accionDB = new Accion(body) //Creamos un nuevo Pokemon, gracias al modelo
         await accionDB.save() //Lo guardamos con .save(), gracias a Mongoose
         res.redirect('/accion') //Volvemos al listado
     } catch (error) {
         console.log('error', error)
     }
})
module.exports = router;