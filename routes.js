module.exports = {

testeApi: require('./testeDeApi'),
postUsuarios: require('./controllerCriaUsuario'),
login: require('./controllerLogin'),
  getUsuarios: function(req, res){
    res.json({message: "rota para GET do /usuarios"})
  }
}