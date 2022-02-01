const Usuario = require("../model/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuarios = async (req, res) => {
  //console.log(req.body);

  // Validar errores con express validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // extraemos el email password
  const { email, password } = req.body;

  try {
    //Revisar que no existan usuarios duplicados con el email
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: "Usuario ya registrado" });
    }
    usuario = new Usuario(req.body);

    /* Hashear el pass del usuario*/
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    await usuario.save();

    // Crear JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //Firmar JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //1 hora
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ msg: "Usuario registrado exitosamente", token });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: `Error al registrar nuevo usuario ${error}` });
  }
};

exports.listarUsuarios = (req, res) => {
  res.send("Lista de usuarios");
};
