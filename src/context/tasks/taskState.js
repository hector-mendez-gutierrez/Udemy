import { useReducer } from "react";
import TareaContext from "./taskContext";
import TareaReducer from "./taskReducer";
import clienteAxios from "../../config/axios";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREAS_ACTUAL,
  ACTUALIZAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaselecionada: null,
  };

  //Crear dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //FUNCIONES CRUD PARA LAS TAREAS

  //Obtner las tareas de un proyecto selecionado
  const obtenerTareas = async (proyecto) => {
    //console.log(proyecto);
    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });
      //console.log(resultado.data.tareas);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Agragra tareas al proyecto selecionado
  const agregarTarea = async (task) => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", task);
      //console.log(resultado);
      dispatch({
        type: AGREGAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Valida y muestra el error en form de tareas
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //Eliminar Tarea
  const eliminarTarea = async (id, proyecto) => {
    try {
      //console.log(id);
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Extrae una tarea para edicion
  const guardarTareaActual = (task) => {
    dispatch({
      type: TAREAS_ACTUAL,
      payload: task,
    });
  };

  //Actuliza una tarea selecionada
  const actualizarTarea = async (tarea) => {
    //console.log(task);
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      //console.log(resultado);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaselecionada: state.tareaselecionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
