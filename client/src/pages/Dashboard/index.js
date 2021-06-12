import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./style.css";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    redirectURL();
  });

  const executeRedirect = (e) => {
    e.preventDefault();
    window.location.replace(newUrl);
  };
  const redirectURL = (e) => {
    API.getRedirect().then((res) => {
      setNewUrl(res.data);
    });
  };

  return (
    <div>
      <h1>Welcome to Your Dashboard!</h1>
      <Button onClick={executeRedirect}>Connect Google Search Console. </Button>
    </div>
  );
};

export default Dashboard;
