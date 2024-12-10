import React from 'react'
import { Navbar,Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

const NavbarHome = () => {
  const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;
  const navigate = useNavigate();
  return (
    <div>
      <Navbar style={{backgroundColor: "rgb(13, 35, 82)", marginBottom: "20px"}}>
        <Navbar.Brand className="navbarBrand" style={{color:"white"}}>Bienvenido a To Do List</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end ">
          {
            user.role === "client" &&(
              <Button style= {{marginRight: 12}}
                onClick={() => navigate("/crear-tarea")}
                className="mt-3 createTask" variant="outline-primary" 
              >
                Crear tarea
              </Button>
            )
          }
            <Button
                onClick={() => navigate("/")}
                className="mt-3 createTask" variant="outline-danger" 
                style= {{marginRight: "12px"}}
              >
                Cerrar sesion
              </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarHome
