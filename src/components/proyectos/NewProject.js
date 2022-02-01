import React, { useContext, useState } from "react";
import projectContext from "../../context/projects/projectContext";

export default function NewProject() {
  //Obtener el state del formulario
  const proyectosContext = useContext(projectContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  //state para el proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //Extraer nombre de proyecto
  const { nombre } = proyecto;

  //Lee los contenidos del input
  const handleChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Envia el formulario
  const handleSubmitProyecto = (e) => {
    e.preventDefault();

    //Validar campos vacios
    if (nombre === "") {
      mostrarError();
      return;
    }

    //Agregar al state
    agregarProyecto(proyecto);

    //Limpiar el form
    guardarProyecto({
      nombre: "",
    });
  };

  //Mostrar formulario
  const handleFormulario = () => {
    mostrarFormulario();
  };

  return (
    <>
      <button
        className="btn btn-block btn-primario"
        type="button"
        onClick={handleFormulario}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form
          action=""
          className="formulario-nuevo-proyecto"
          onSubmit={handleSubmitProyecto}
        >
          <input
            type="text"
            name="nombre"
            value={nombre}
            className="input-text"
            placeholder="Nombre Proyecto"
            onChange={handleChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar proyecto"
          />
        </form>
      ) : null}

      {errorformulario ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) : null}
    </>
  );
}
