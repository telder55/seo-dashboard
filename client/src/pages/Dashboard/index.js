import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import { AuthContext } from "../../context/AuthContext";
import "./style.css";
const queryString = require("query-string");
const parsed = queryString.parse(window.location.search);

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [newUrl, setNewUrl] = useState("");

  console.log(parsed.code);

  useEffect(() => {
    redirectURL();
  });

  const executeRedirect = (e) => {
    e.preventDefault();
    window.location.replace(newUrl);
  };
  const redirectURL = () => {
    API.getRedirect().then((res) => {
      setNewUrl(res.data);
    });
  };

  const getToken = (e) => {
    e.preventDefault();
    API.exchangeCode(parsed).then((res) => {
      console.log("Token: ", res.data);
    });
  };

  return (
    <div>
      <h1>Welcome to Your Dashboard!</h1>
      <Button onClick={executeRedirect}>Connect Google Search Console. </Button>
      <Button onClick={getToken}>Click to get token </Button>
    </div>
  );
};

export default Dashboard;
