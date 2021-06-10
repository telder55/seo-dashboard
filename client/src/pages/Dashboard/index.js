import React, { useContext } from "react";
import Button from "@material-ui/core/Button";

import { AuthContext } from "../../context/AuthContext";
import "./style.css";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  return (
    <div>
      <h1>Welcome to Your Dashboard!</h1>
    </div>
  );
};

export default Dashboard;
