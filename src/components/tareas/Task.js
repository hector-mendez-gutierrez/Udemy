import { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import tareaContext from "../../context/tasks/taskContext";

export default function Task({ task }) {
  //Extraer el state inicial de proyectos
  const proyectosContext = useContext(projectContext);
  const { project } = proyectosContext;

  // Context para tareas
  const tareasContext = useContext(tareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    actualizarTarea,
    guardarTareaActual,
  } = tareasContext;

  const [proyectoActual] = project;

  //Funcion que se ejecuta al eliminar una tarea
  const tareaEliminar = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual);
  };

  //Funcion para obtener una tarea y poder modificarla
  const selecionarTarea = (task) => {
    guardarTareaActual(task);
  };

  //Funcion que modifica el estado de las tareas
  const cambiarEstado = (task) => {
    if (task.estado) {
      task.estado = false;
    } else {
      task.estado = true;
    }
    actualizarTarea(task);
  };

  return (
    <li className="tarea sombra">
      <p>{task.nombre}</p>
      <div className="estado">
        {task.estado ? (
          <button
            className="completo"
            type="button"
            onClick={() => cambiarEstado(task)}
          >
            Completo
          </button>
        ) : (
          <button
            className="incompleto"
            type="button"
            onClick={() => cambiarEstado(task)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => selecionarTarea(task)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(task._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
