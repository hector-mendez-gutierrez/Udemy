import React, { useContext, useEffect } from "react";
import Project from "./Project";
import projectContext from "../../context/projects/projectContext";
import AlertaContex from "../../context/alerts/alertContext";

export default function ListProject() {
  // Extraer proyectos de state incial (global)
  const proyectosContext = useContext(projectContext);
  const { mensaje, projects, obtenerProyectos } = proyectosContext;

  //Extrae las alertas del state

  const alertaContext = useContext(AlertaContex);
  const { alerta, mostrarAlerta } = alertaContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    // validar si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyectos();

    //eslint-disable-next-line
  }, [mensaje]);

  // revisar si existen proyectos
  if (projects.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;
  //console.log(projects);
  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      {projects.map((project) => (
        <Project key={project._id} project={project} />
      ))}
    </ul>
  );
}
