import { useContext, useEffect } from "react";
import Barra from "../layout/Barra";
import Sidebar from "../layout/Sidebar";
import FormTask from "../tareas/FormTask";
import ListTask from "../tareas/ListTask";
import AuthContext from "../../context/auth/authContext";

export default function ProjectsPage() {
  // Extraer la i formacion del usuario Autenticado
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTask />
          <div className="contenedor-tarea">
            <ListTask />
          </div>
        </main>
      </div>
    </div>
  );
}
