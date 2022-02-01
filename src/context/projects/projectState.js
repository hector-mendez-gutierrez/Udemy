import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";

import projectContext from "./projectContext";
import projectReducer from "./projectReducer";

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types";

const ProjectState = (props) => {
  const initialState = {
    projects: [],
    formulario: false,
    errorformulario: false,
    project: null,
    mensaje: null,
  };

  //Dispatch para ejecutar las aciones
  const [state, dispatch] = useReducer(projectReducer, initialState);

  //FUNCIONES CRUD PARA PROYECTOS

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //Obtener los proyectos
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");
      // console.log(resultado.data);
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  // Agregar Proyectos
  const agregarProyecto = async (project) => {
    // agrega id al proyecto
    //projects.id = uuidv4();
    try {
      const resultado = await clienteAxios.post("/api/proyectos", project);
      //console.log(resultado);

      // Agrega el proyecto al state
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //Validar formulario de proyectos
  const mostrarError = () => {
    dispatch({ type: VALIDAR_FORMULARIO });
  };

  //Muestra el producto que seleciono el usuario
  const proyectoActual = (projectId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: projectId,
    });
  };

  //Elimina un proyecto
  const eliminarProyecto = async (projectId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${projectId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: projectId,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        project: state.project,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
