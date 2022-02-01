const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Leer el token
  const token = req.header("x-auth-token");
  //  console.log(token);

  //Revisar si no hay token
  if (!token) {
    return res.status(401).json({ msg: "No Hay token" });
  }

  //validar el token

  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(500).json({ msg: `No tiene permisos para la ruta ${error}` });
  }
};
