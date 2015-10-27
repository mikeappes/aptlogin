var Usuario = require('./ModelUsuario')
  , jwt = require('jwt-simple')
  , moment = require('moment')
  , segredo = 'seusegredodetoken'
module.exports = function(req, res) {
  var username = req.body.username || '';
  var password = req.body.password || '';
  if (username == '' || password == '') {
    return res.send(401);
  }
  //1
  Usuario.findOne({username: username}, function (err, user) {
    if (err) {
      return res.end(401)
    }
    //2
    user.verificaSenha(password, function(isMatch) {
      if (!isMatch) {
        return res.send(401);
      }
    //3
    var expires = moment().add(7,'days').valueOf();
    var token = jwt.encode({
      iss: user.id,
      exp: expires
    }, segredo);
    //4
     return res.json({
      token : token,
      expires: expires,
      user: user.toJSON()
      });
      });
    });
};