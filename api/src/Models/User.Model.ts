import { model, Schema } from "mongoose";
import { IUsers } from "../GlobalTypes";

const UserSchema = new Schema<IUsers>({
  name: {
    type: String,
    required: true,
  },
  lastNames: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["administrator", "client"],
    required: true,
  },
});

export const UserModel = model("users", UserSchema);
