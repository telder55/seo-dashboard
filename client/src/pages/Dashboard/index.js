import React, { useContext } from "react";
import Button from "@material-ui/core/Button";

import { AuthContext } from "../../context/AuthContext";
import "./style.css";

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to Your Dashboard!</h1>
      <a href="">
        <Button>
          Click this very button to let us look at your search data please.{" "}
        </Button>
      </a>
    </div>
  );
};

export default Dashboard;
