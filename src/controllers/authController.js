const Usuario = require("../model/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  // Validar errores con express validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Extraer el email y pass

  const { email, password } = req.body;
  try {
    //Verificar que el usuario exista en la bd
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "Usuario o contraseña no validos" });
    }

    //Revisar pass
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Usuario o contraseña no validos" });
    }

    // Si todo va bien /Crear JWT
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
        res.status(200).json({ msg: "Usuario valido", token });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: `Error al autenticar usuario ${error}` });
  }
};
//usuario autenticado

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password"); //no envia el pass
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json({ msg: `Error al autenticar usuario ${error}` });
  }
};
