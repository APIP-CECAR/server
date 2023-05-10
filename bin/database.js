const mongoose = require("mongoose");

try {
  mongoose.set("strictQuery", false); //para que no se muestre el error de deprecated
  //se intenta establecer una conexion con los datos de conexion
  mongoose.connect(
    "mongodb+srv://admin-cecar:fYUWdVeyDucqGlIR@cluster0.pms1jsq.mongodb.net/cecardb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  //en caso de esablecer la conexion, se muestra en consola este mensaje
  console.log("Connected databases.");
} catch (e) {
  //en caso de haber un error se muestra en consola el error
  console.error(e);
}
