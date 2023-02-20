const express = require('express')
const bodyParser  = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
require ('dotenv').config()
const port = process.env.PORT||3005
//Conexión a base de datosnpm
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
/*
PORT=4000


*/
//para que nadie vea directamente nuestras credenciales
const uri= `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.kfqrd9o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))
//motor de plantilla
app.set('views',__dirname + '/views');
app.set('view engine' ,'ejs')

//middleware
app.use(express.static(__dirname + '/public'));

//Llamadas a las rutas:

app.use('/', require('./router/rutas'));
app.use('/voluntario', require('./router/voluntario'));
app.use('/personas', require('./router/personas'));
app.use('/accion', require('./router/accion'));


app.use('/centro', require('./router/centro'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
