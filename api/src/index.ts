import mongoose from "mongoose";
import app from "./app";


const main = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/TODOLIST1");
    console.log("La base de datos está funcionando correctamente.");

    app.listen(4000, () => {
      console.log("El servidor se escucha correctamente.");
    });
  } catch (error) {
    console.log("Algo salio mal con la base de datos");
  }
};

main();
