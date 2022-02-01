const { Router } = require("express");
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Correo invalido").isEmail(),
    check("password", "El password debe ser de almenos 6 Caracteres").isLength({
      min: 6,
    }),
  ],
  usuarioController.crearUsuarios
);

router.get("/", usuarioController.listarUsuarios);

module.exports = router;
