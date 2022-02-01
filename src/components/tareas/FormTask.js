import { useContext, useState, useEffect } from "react";
import projectContext from "../../context/projects/projectContext";
import tareaContext from "../../context/tasks/taskContext";

export default function FormTask() {
  //Extraer el state inicial
  const proyectosContext = useContext(projectContext);
  const { project } = proyectosContext;

  // Context para tareas
  const tareasContext = useContext(tareaContext);
  const {
    agregarTarea,
    validarTarea,
    errortarea,
    obtenerTareas,
    tareaselecionada,
    actualizarTarea,
  } = tareasContext;

  //Effect para detectar que exista una tarea selcionada
  useEffect(() => {
    if (tareaselecionada !== null) {
      guardarTarea(tareaselecionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaselecionada]);

  //State del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //Extraer el nombre de la tarea
  const { nombre } = tarea;

  //Si no hay ningun proyecto selecionado
  if (!project) return null;

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = project;

  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();

    //Validar los campos
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Revisa si es una nueva tarea o es para editar una tarea
    if (tareaselecionada === null) {
      //Agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;

      agregarTarea(tarea);
    } else {
      //Actulizar tareas Existente
      actualizarTarea(tarea);
    }

    //Obtener y filtrar tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    //Reiniciar el form
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario" onSubmit={handleSubmitTask}>
      <form>
        <div className="contenedor-input">
          <input
            type="text"
            name="nombre"
            className="input-text"
            placeholder="Nombre Tarea.."
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaselecionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
}
