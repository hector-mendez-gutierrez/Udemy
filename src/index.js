const express = require("express");
const conexion = require("./config/db");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 6000;

//Settings
app.use(express.json({ extend: true }));

//conexion a db
conexion();


//habilitar cors
app.use(cors());

//Routes de la Api
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

//Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
