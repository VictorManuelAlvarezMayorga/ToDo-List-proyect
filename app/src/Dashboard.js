import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import NavbarHome from "./Navbar";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [metrics, setMetrics] = useState({
    numberOfUsers: 0,
    numberOfTasks: 0,
  });

  useEffect(() => {
    getUser();
    getMetrics();
  }, []);

  const getUser = () => {
    const user = JSON.parse(localStorage.user);
    setUser(user);
  };

  const getMetrics = async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/dashboard");

      const data = {
        numberOfTasks: res.data.numberOfTasks,
        numberOfUsers: res.data.numberOfUsers,
      };

      setMetrics(data);
    } catch (error) {
      alert("Hubo un error al obtener las métricas.", error);
    }
  };

  return (
    <div>
      <NavbarHome />

      <Container className="containerDashboard">
        <Card>
          <Card.Body>
            <Card.Title className="mb-3 subtitleDashboardText">
              Bienvenido {user.name} {user.lastNames}
            </Card.Title>

            {/*Tabla para visualizar el Dashboard */}
            <Container style={{ marginTop: "7%", width:"800px", margin: "auto"}}>
              <Card className="cardsDashboard">
                <Card.Body>
                  <Card.Title>
                    Número de Usuarios
                  </Card.Title>
                  <Card.Text className="numberOf">
                    {metrics.numberOfUsers}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="cardsDashboard">
                <Card.Body>
                  <Card.Title className="subtitleDashboard">
                    Número de Tareas Totales
                  </Card.Title>
                  <Card.Text className="numberOf">
                    {metrics.numberOfTasks}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;
