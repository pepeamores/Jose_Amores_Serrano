const express = require('express');
const Voluntario = require('../models/voluntario');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayVoluntarioDB = await Voluntario.find();
        console.log(arrayVoluntarioDB);
        res.render("voluntario", { 
            arrayVoluntario: arrayVoluntarioDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearvoluntario', (req, res) => {
    res.render('crearvoluntario'); //nueva vista que llamaremos Crear
})

 
 router.post('/', async (req, res) => {
     const body = req.body //Gracias al body parser, de esta forma
     //podremos recuperar todo lo que viene del body
     console.log(body) //Para comprobarlo por pantalla
     try {
         const voluntarioDB = new Voluntario(body) //Creamos un nuevo Pokemon, gracias al modelo
         await voluntarioDB.save() //Lo guardamos con .save(), gracias a Mongoose
         res.redirect('/voluntario') //Volvemos al listado
     } catch (error) {
         console.log('error', error)
     }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    try {
        const voluntarioDB = await Voluntario.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(voluntarioDB) //Para probarlo por consola
        res.render('detallevoluntario', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            voluntario: voluntarioDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detallevoluntario', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Entrenador no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const voluntarioDB = await Voluntario.findByIdAndDelete({ _id: id });
        console.log(voluntarioDB)
        if (!voluntarioDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Voluntario.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Voluntario eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const voluntarioDB = await Voluntario.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(voluntarioDB)
        res.json({
            estado: true,
            mensaje: 'Voluntario editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Voluntario'
        })
    }
})
module.exports = router;