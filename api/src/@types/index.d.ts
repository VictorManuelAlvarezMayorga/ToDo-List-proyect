interface IUsers {
  _id: string;
  name: string;
  email: string;
  lastNames: string;
  password: string;
  role: "administrator" | "client";
}

declare namespace Express {
    export interface Request {
      user?: IUsers;
    }
  }
