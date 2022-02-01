const { Router } = require("express");
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.crearProyecto
);
router.get("/", auth, proyectoController.listarProyectos);
router.get("/:id", auth, proyectoController.listarProyecto);
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.modificarProyecto
);
router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
