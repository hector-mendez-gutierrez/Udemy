import React, { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import tareaContext from "../../context/tasks/taskContext";
import Task from "./Task";

export default function ListTask() {
  //Extraer el state inicial de proyectos
  const proyectosContext = useContext(projectContext);
  const { project, eliminarProyecto } = proyectosContext;

  //Extraer el state inicial de Tareas
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;

  //Si no hay ningun proyecto selecionado
  if (!project) return <h2>Seleciona un proyecto</h2>;

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = project;

  //Array destructuring para extraer tareas correspondientes a cada proyecto
  // const [tareasproyecto] = tasks;

  //console.log(proyectoActual.id);

  //Eliminar un proyecto
  const handleEliminarProyecto = () => {
    eliminarProyecto(proyectoActual._id);
  };
  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          tareasproyecto.map((task) => <Task key={task._id} task={task} />)
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={handleEliminarProyecto}
      >
        Eliminar Proyecto &times;
      </button>
    </>
  );
}
