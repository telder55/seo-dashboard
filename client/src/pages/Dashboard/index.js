import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import "./style.css";
import { AuthContext } from "../../context/AuthContext";

const queryString = require("query-string");
const parsed = queryString.parse(window.location.search);

const Dashboard = () => {
  const [newUrl, setNewUrl] = useState("");
  const [connectionState, setConnectionState] = useState(false);
  const person = JSON.parse(localStorage.getItem("userInfo"));
  const tempPerson = localStorage.getItem("connectionStatus");
  const currentUser = { id: person[0]._id, code: parsed.code };
  const history = useHistory();
  const auth = useContext(AuthContext);

  useEffect(() => {
    redirectURL();
    if (person[0].refreshtoken) {
      setConnectionState(true);
      return;
    } else if (tempPerson) {
      setConnectionState(true);
    } else if (currentUser.code) {
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
          Let's get you connected to Google Search Console to start tracking
          your search metrics.
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
      if (res.status === 200) {
        const updatedUserInfo = JSON.stringify([
          {
            refreshtoken: res.data,
          },
        ]);
        localStorage.setItem("connectionStatus", updatedUserInfo);
        window.location.replace("/dashboard");
      }
      // console.log(res.data);
    });
  };

  return (
    <>
      <Greeting isLoggedIn={connectionState} />
    </>
  );
};

export default Dashboard;
