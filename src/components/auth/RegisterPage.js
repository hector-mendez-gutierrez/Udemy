import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";

export default function RegisterPage(props) {
  // Extraer los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Extraer los valores del context de autenticacion
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registroUsuario } = authContext;

  //En caso de que el usuario se haya registrado, autenticado o este duplicado

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

  //state inicial
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  //Obtiene los valores de los inputs
  const { nombre, email, password, confirmar } = usuario;

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
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son Obligatorios", "alerta-error");
      return;
    }

    //Validar password minimo 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe tener minimo 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //validar los password
    if (password !== confirmar) {
      mostrarAlerta("Los password no son iguales", "alerta-error");
      return;
    }

    //Funcion del action
    registroUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={handleChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="imail"
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
            <label htmlFor="confirmar">Confirmar password</label>
            <input
              type="password"
              name="confirmar"
              id="confirmar"
              placeholder="Confirme su contraseña"
              value={confirmar}
              onChange={handleChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="Registrate"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
