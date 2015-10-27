var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , jwt = require('jwt-simple');

  var db = 'mongodb://goreport:goappes@ds045604.mongolab.com:45604/heroku_cb8cxw47';//coloque a url do db aqui
  
  app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
  var port = process.env.PORT || 8080;
  var router = express.Router();
  app.use('/api', router);

  /*Aqui criaremos as rotas*/
  var rotas = require('./routes')
  router.route('/usuarios')
    .get(require('./validarJWT'),rotas.getUsuarios)
    .post(rotas.postUsuarios);
  router.route('/login')
    .post(rotas.login);
 
  mongoose.connect(db);
  app.listen(port);
  console.log('conectado a porta ' + port);