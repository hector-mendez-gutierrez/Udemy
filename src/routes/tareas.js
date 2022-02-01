const { Router } = require("express");
const tareaController = require("../controllers/tareasController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/",
  auth,
  [check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty()],
  tareaController.crearTera
);
// listar tareas por proyecto
router.get("/", auth, tareaController.listarTeras);
router.get("/:id", tareaController.listarTera);
router.put("/:id", auth, tareaController.modificarTera);
router.delete("/:id", auth, tareaController.eliminarTera);

module.exports = router;
