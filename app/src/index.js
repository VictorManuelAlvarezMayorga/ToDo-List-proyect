import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import Home from "./Home";
import Registration from "./Registration";
import CreateTask from "./CreateTask";
import UpdateTask from "./UpdateTask";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/inicio",
    element: <Home />,
  },
  {
    path: "/registrarse",
    element: <Registration />,
  },
  {
    path: "/actualizar-tarea/:taskId",
    element: <UpdateTask />,
  },
  {
    path: "/crear-tarea",
    element: <CreateTask />,
  }
]);


const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;
console.log(user)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();