import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import "./style.css";
const queryString = require("query-string");
const parsed = queryString.parse(window.location.search);

const Dashboard = () => {
  const [newUrl, setNewUrl] = useState("");
  const [connectionState, setConnectionState] = useState(false);
  const person = JSON.parse(localStorage.getItem("userInfo"));
  const currentUser = { id: person[0]._id, code: parsed.code };
  console.log(currentUser);

  useEffect(() => {
    redirectURL();
    if (parsed.code) {
      setConnectionState(true);
      getToken();
    }
  }, []);

  function ConnectedGreeting(props) {
    return <h1>Nice, we're connected!</h1>;
  }

  function InitialGreeting(props) {
    return (
      <div className="welcome">
        <h2>Welcome to Your Dashboard {person[0].first}!</h2>
        <p>
          First let's get you connected to Google Search Console to start
          tracking your search metrics.
        </p>

        <Button
          className="connect-button"
          variant="contained"
          color="secondary"
          onClick={executeRedirect}
        >
          Connect Google{" "}
        </Button>
      </div>
    );
  }

  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <ConnectedGreeting />;
    }
    return <InitialGreeting />;
  }

  const executeRedirect = (e) => {
    e.preventDefault();
    window.location.replace(newUrl);
  };
  const redirectURL = () => {
    API.getRedirect().then((res) => {
      setNewUrl(res.data);
    });
  };

  const getToken = () => {
    API.exchangeCode(currentUser).then((res) => {
      console.log("Token: ", res.data);
    });
  };

  return (
    <>
      <Greeting isLoggedIn={connectionState} />
    </>
  );
};

export default Dashboard;
