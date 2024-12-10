import { Schema } from "mongoose";

export interface IUsers {
  name: string;
  lastNames: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "administrator" | "client";
}

export interface ITasks {
  task: string;
  description: string;
  dueDate: string;
  userId: Schema.Types.ObjectId;
  status: boolean;
}
