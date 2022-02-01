import React, { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import tareaContext from "../../context/tasks/taskContext";

export default function Project({ project }) {
  // Context para proyectos
  const proyectosContext = useContext(projectContext);
  const { proyectoActual } = proyectosContext;

  // Context para tareas
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  //console.log(proyectoActual);
  //console.log(project.id);

  //Funcion para agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id); //Fija el proyecto actual
    obtenerTareas(id); //Filtra las tareas cuando hacemos click
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(project._id)}
      >
        {project.nombre}
      </button>
    </li>
  );
}
