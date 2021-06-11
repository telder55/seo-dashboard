import React, { useContext } from "react";
import Button from "@material-ui/core/Button";

import { AuthContext } from "../../context/AuthContext";
import "./style.css";

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to Your Dashboard!</h1>
      <a href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fwebmasters&response_type=code&client_id=581749580855-7os7thh02ips6t6okk4hdklg0s54eopu.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard">
        <Button>
          Click this very button to let us look at your search data please.{" "}
        </Button>
      </a>
    </div>
  );
};

export default Dashboard;
