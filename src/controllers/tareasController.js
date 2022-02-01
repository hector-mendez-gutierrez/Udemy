const Tarea = require("../model/Tareas");
const Proyecto = require("../model/Proyecto");
const { validationResult } = require("express-validator");

exports.crearTera = async (req, res) => {
  // Validar errores con express validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    // Extraer el proyecto y validar si existe!
    const { proyecto } = req.body;
    const existe = await Proyecto.findById(proyecto);
    if (!existe) {
      return res.status(404).json({ msg: "Proyecto no existe" });
    }
    // revisar si el proyecto actual, pertenece al usuario autenticado
    if (existe.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //Creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(200).json({ tarea });
  } catch (error) {
    res.status(500).json({ msg: `Error al crear la Tarea ${error}` });
  }
};
//Tareas por proyectos
exports.listarTeras = async (req, res) => {
  try {
    // Extraer el proyecto y validar si existe!
    const { proyecto } = req.query;
    //console.log(req.query);
    const existe = await Proyecto.findById(proyecto);
    if (!existe) {
      return res.status(404).json({ msg: "Proyecto no existe" });
    }
    // revisar si el proyecto actual, pertenece al usuario autenticado
    if (existe.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //Obtener las tarea por proyecto
    const tareas = await Tarea.find({ proyecto });
    res.status(200).json({ tareas });
  } catch (error) {
    res.status(500).json({ msg: `Error al listar Tarea  ${error}` });
  }
};

exports.listarTera = (req, res) => {};

exports.modificarTera = async (req, res) => {
  try {
    // Extraer el proyecto y
    const { proyecto, nombre, estado } = req.body;

    //validar y revisar si la tarea existe
    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ msg: "No Existe Tarea" });
    }

    // Validar si proyecto existe!
    const existe = await Proyecto.findById(proyecto);

    // revisar si el proyecto actual, pertenece al usuario autenticado
    if (existe.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //Actulizar tarea con nueva informacion
    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    //Guardar la tarea
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });
    res.status(200).json({ tarea });
  } catch (error) {
    res.status(500).json({ msg: `Error al modificar Tarea ${error}` });
  }
};

exports.eliminarTera = async (req, res, next) => {
  try {
    // Extraer el proyecto
    const { proyecto } = req.query;
    //console.log(req.query);

    //validar y revisar si la tarea existe
    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ msg: "No Existe Tarea" });
    }

    // Validar si proyecto existe!
    const existe = await Proyecto.findById(proyecto);

    // revisar si el proyecto actual, pertenece al usuario autenticado
    if (existe.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //Eliminar
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: "Tarea Eliminada!" });
  } catch (error) {
    res.status(500).json({ msg: `Error al eliminar la Tarea ${error}` });
    next();
  }
};
