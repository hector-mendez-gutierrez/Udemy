const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const conexion = async () => {
  console.log(process.env.DB_URL);
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    console.log("conectado a db");
  } catch (error) {
    console.log(`Hubo un error al conectar con db ${error}`);
    process.exit(1); // En caso de error detiene la app
  }
};

module.exports = conexion;
