import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREAS_ACTUAL,
  ACTUALIZAR_TAREA,
} from "../../types";

export default function taskReducer(state, action) {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasproyecto: action.payload,
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasproyecto: [action.payload, ...state.tareasproyecto],
        errortarea: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errortarea: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
        tareaselecionada: null, //limpia el form de tareas cuando actuliza o modifica
      };
    case TAREAS_ACTUAL:
      return {
        ...state,
        tareaselecionada: action.payload,
      };

    default:
      return state;
  }
}
