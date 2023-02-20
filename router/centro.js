const express = require('express');
const Centro = require('../models/centro');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayCentroDB = await Centro.find();
        console.log(arrayCentroDB);
        res.render("centro", { 
            arrayCentro: arrayCentroDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearcentro', (req, res) => {
    res.render('crearcentro'); //nueva vista que llamaremos Crear
})

 
 router.post('/', async (req, res) => {
     const body = req.body //Gracias al body parser, de esta forma
     //podremos recuperar todo lo que viene del body
     console.log(body) //Para comprobarlo por pantalla
     try {
         const centroDB = new Centro(body) //Creamos un nuevo Pokemon, gracias al modelo
         await centroDB.save() //Lo guardamos con .save(), gracias a Mongoose
         res.redirect('/centro') //Volvemos al listado
     } catch (error) {
         console.log('error', error)
     }
})
module.exports = router;