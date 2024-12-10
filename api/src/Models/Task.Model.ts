import { model, Schema } from "mongoose";
import { ITasks } from "../GlobalTypes";

const TaskSchema = new Schema<ITasks>({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean, 
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const TaskModel = model("tasks", TaskSchema)