import express, { Application, Request, Response } from "express";
import cors from "cors";
import { RegisterUsers, SignIn } from "./Controllers/Users.Controller";
import {
  ChangeStatus,
  CreateTask,
  DeleteTask,
  GetMetrics,
  GetTask,
  GetTasks,
  UpdateTask,
} from "./Controllers/Task.Controller";

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hola desde mi servidor con TS");
});

// Usuarios
app.post("/users/registration", RegisterUsers);
app.post("/users/sign-in", SignIn);

//Dashboard
app.get("/admin/dashboard", GetMetrics);

//Tareas
app.post("/tasks/create", CreateTask);
app.post("/tasks/get", GetTasks);
app.get("/tasks/:taskId", GetTask)
app.put("/tasks/update/:taskId", UpdateTask)
app.delete("/tasks/delete/:taskId", DeleteTask);

/**
 ** Tarea actualizada.
 */
app.put("/task-status/:taskId", ChangeStatus);

export default app;
