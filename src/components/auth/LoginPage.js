import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";

export default function LoginPage(props) {
  // Extraer los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Extraer los valores del context de autenticacion
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //En caso de que usuario o contraseña no existan
  useEffect(() => {
    //Evaluar si el usuario esta autenticado y lo redireccionamos al dashborad

    if (autenticado) {
      props.history.push("/projects");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //state inicial del componente
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });
  //Obtiene los valores de los inputs

  const { email, password } = usuario;

  //Funcion para inciar sesión
  const handleChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //Funcion para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // para que el formulario no se recarge

    //Validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }

    //Pasarlo al action
    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="Iniciar Sesión"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
        <Link to={"/register"} className="enlace-cuenta">
          Crear cuenta
        </Link>
      </div>
    </div>
  );
}
/*
Notas
state inicial para iniciar sesión, inicia con un objeto vacio
... siginifican que toma una copia lo del otro campo y no se reescriba

*/
