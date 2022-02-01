const Proyecto = require("../model/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  try {
    // Validar errores con express validator
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const proyecto = await new Proyecto(req.body);

    //guardar el creador del proyecto,con JWT, la data biene del Payload usuario.id
    proyecto.creador = req.usuario.id;

    //guardamosel proyecto
    proyecto.save();
    res.status(200).json(proyecto);
  } catch (error) {
    res.status(500).json({ msg: `Error al crear el proyecto ${error}` });
  }
};

exports.listarProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1, //.sort = order by sql
    });
    res.status(200).json({ proyectos });
  } catch (error) {
    res.status(500).json({ msg: `Error al listar el proyecto ${error}` });
  }
};

exports.listarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);

    res.status(200).json({ proyecto });
  } catch (error) {
    res.status(500).json({ msg: `Error al listar el proyecto ${error}` });
  }
};

exports.modificarProyecto = async (req, res) => {
  // Validar errores con express validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    // revisar el id
    let proyecto = await Proyecto.findById(req.params.id);

    // revisar si el proyecto existe
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //verificar al creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }
    //actulizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
    res.status(200).json({ proyecto });
  } catch (error) {
    res.status(500).json({ msg: `Error al Modificar el proyecto ${error}` });
  }
};

exports.eliminarProyecto = async (req, res) => {
  try {
    // revisar el id
    let proyecto = await Proyecto.findById(req.params.id);

    // revisar si el proyecto existe
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //verificar al creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Eliminar Proyecto
    await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: "Proyecto eliminado" });
  } catch (error) {
    res.status(500).json({ msg: `Error al Modificar el proyecto ${error}` });
  }
};
