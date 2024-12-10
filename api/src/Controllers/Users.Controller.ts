import { Request, Response } from "express";
import { UserModel } from "../Models/User.Model";
import jwt from "jsonwebtoken";

export const RegisterUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, lastNames, email, password, confirmPassword, role } =
      req.body;

    // Los administradores no pueden crear clientes.
    if (req.user?.role === "administrator" && role === "client") {
      res.status(400).json({
        msg: "Los administradores no pueden crear usuarios.",
      });
      return;
    }

    // Validar si están todos los valores.
    if (
      !name ||
      !lastNames ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      res.status(400).json({
        msg: "Completa todos los datos para crear al usuario.",
      });
      return;
    }

    //Validar que el usuario sea admin si el usuario a crear es administrador.
    if (role === "administrator" && req.user?.role !== "administrator") {
      res.status(400).json({
        msg: "No puedes crear un administrador, ya que no eres uno.",
      });
      return;
    }

    /* Creacón del usuario. */
    const user = await UserModel.create({
      name,
      lastNames,
      email,
      password,
      confirmPassword,
      role,
    });


    // Verificar que las contraseñas sean iguales.
    if (user.password !== user.confirmPassword) {
      res.status(400).json({
        msg: "Las contraseñas no coinciden.",
      });
    }

    //Generación del Token
    const token = jwt.sign(JSON.stringify(user), "Cifrado Usuarios");

    //Operación Éxitosa
    res.status(200).json({
      msg: "El usuario se ha registrado con éxito.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al momento de registrar al usuario.",
    });
  }
};

export const SignIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        msg: "Completa todos los campos para iniciar sesión.",
      });
    }

    try {
      const user = await UserModel.findOne({
        email,
      });

      if (!user?.email) {
        res.status(400).json({
          msg: "El usuario no éxiste. ¿Quieres registrar uno?",
          email,
        });
        return;
      }

      if (user.password !== password) {
        res.status(400).json({
          msg: "Contraseña incorrecta.",
        });
        return;
      }

      res.status(200).json({
        msg: "Bienvenido",
        user,
        email,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hubo un error al encontrar al usuario.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al iniciar sesión. Inténtelo de nuevo.",
    });
  }
};
