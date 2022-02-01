import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

export default function RutaPrivada({ component: Component, ...props }) {
  // console.log(props);
  const authContext = useContext(AuthContext);
  const { autenticado, usuarioAutenticado, cargando } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

/** Aier order componets */
