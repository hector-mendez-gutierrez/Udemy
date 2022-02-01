import React, { useReducer } from "react";
import alertReducer from "./alertReducer";
import alertContext from "./alertContext";

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

export default function AlertsState(props) {
  const initialState = {
    alerta: null,
  };
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Funciones

  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria,
      },
    });
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000); // en 5 segundos se oculta la alerta
  };

  return (
    <alertContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
}
