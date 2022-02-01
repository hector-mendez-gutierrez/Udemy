const { Router } = require("express");
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const router = Router();

router.post("/", authController.autenticarUsuario);

router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
