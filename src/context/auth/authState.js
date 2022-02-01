import { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";

export default function AuthState(props) {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //funciones
  const registroUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      // console.log(respuesta.data);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });

      //Obtiene el usuario autenticado
      usuarioAutenticado();
    } catch (error) {
      // console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  //Retornar usuario autenticado

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //Funcion para enviar el token por headers
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/auth");
      // console.log(respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //cuando el usuario inicia sesion
  const iniciarSesion = async (datos) => {
    // console.log(datos);
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      // console.log(respuesta.data);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      //Obtiene el usuario autenticado
      usuarioAutenticado();
    } catch (error) {
      // console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };
  // Cerrar sesion del usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        //state
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        //Funciones
        registroUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

/* cargando, es para evitar el flash cua do recargamos
 la pagina una ves el usuario este autenticado*/
