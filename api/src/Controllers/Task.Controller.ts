import { Request, Response } from "express";
import { ITasks } from "../GlobalTypes";
import { TaskModel } from "../Models/Task.Model";
import mongoose from "mongoose";
import { UserModel } from "../Models/User.Model";

export const CreateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { task, description, dueDate, userId, status } = req.body;

    if (!task || !description || !dueDate || !userId || status == undefined) {
      res.status(400).json({
        msg: "Faltan datos para crear la tarea.",
      });
      return;
    }

    const ObjectId = mongoose.Types.ObjectId;

    if (!ObjectId.isValid(userId)) {
      res.status(400).json({
        msg: "El Id del usuario no es válido.",
      });
      return;
    }

    const newTask: ITasks = {
      task,
      description,
      dueDate,
      status,
      userId,
    };

    const createdTask = await TaskModel.create(newTask);

    res.status(200).json({
      msg: createdTask,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al crear la tarea.",
    });
  }
};

export const ChangeStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const ObjectId = mongoose.Types.ObjectId;

    if (!ObjectId.isValid(taskId)) {
      res.status(400).json({
        msg: "El id de la tarea no es válido.",
      });
      return;
    }

    const updatedStatus = await TaskModel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedStatus) {
      res.status(404).json({
        msg: "La tarea no existe.",
      });
      return;
    }

    res.status(200).json({
      msg: "La tarea ha sido completada / descompletada.",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al marcar la tarea como completada / descompletada.",
    });
  }
};

export const GetMetrics = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const numberOfUsers = await UserModel.find({
      role: "client",
    }).countDocuments();

    const numberOfTasks = await TaskModel.find().countDocuments();

    res.status(200).json({
      msg: "Datos obtenidos con éxito.",
      numberOfUsers,
      numberOfTasks,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error en encontrar los datos.",
    });
  }
};

export const GetTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const ObjectId = mongoose.Types.ObjectId;

    if (!ObjectId.isValid(taskId)) {
      res.status(400).json({
        msg: "El id de la tarea no es válido.",
      });
      return;
    }

    const getTask = await TaskModel.findById(taskId);

    if (!getTask) {
      res.status(400).json({
        msg: "La tarea no existe.",
      });
      return;
    }

    res.status(200).json({
      msg: "Aqui tienes la tarea:",
      task: getTask,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al obtener la tarea.",
    });
  }
};

export const GetTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    const tasks = await TaskModel.find({
      userId,
    });

    res.status(200).json({
      msg: "Las tareas han sido obtenidas con éxito",
      userId,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al obtener las tareas.",
    });
  }
};

export const UpdateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { task, description, dueDate } = req.body;

    if (!task || !description || !dueDate) {
      res.status(400).json({
        msg: "Faltan datos necesarios para actualizar la tarea.",
      });
      return;
    }

    const ObjectId = mongoose.Types.ObjectId;

    if (!ObjectId.isValid(taskId)) {
      res.status(400).json({
        msg: "El Id de la tarea no es válido.",
      });
      return;
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      {
        task,
        description,
        dueDate,
      },
      { new: true }
    );

    if (!updatedTask) {
      res.status(400).json({
        msg: "La tarea no éxiste",
      });
      return;
    }

    res.status(200).json({
      msg: "La tarea ha sido actualizada.",
    });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({
      msg: "Hubo un error al actualizar la tarea.",
    });
  }
};

export const DeleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { taskId } = req.params;
    const ObjectId = mongoose.Types.ObjectId;

    if (!ObjectId.isValid(taskId)) {
      res.status(400).json({
        msg: "El id de la tarea no es válido.",
      });
      return;
    }

    const deleteTask = await TaskModel.findByIdAndDelete(taskId);

    if (!deleteTask) {
      res.status(400).json({
        msg: "La tarea no existe.",
      });
      return;
    }

    res.status(200).json({
      msg: "La tarea ha sido eliminada.",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al eliminar la tarea.",
    });
  }
};
