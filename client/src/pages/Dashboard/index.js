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
  const tempPerson = localStorage.getItem("connectionStatus");
  const currentUser = { id: person[0]._id, code: parsed.code };

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
    return (
      <div className="connected">
        <h2>{person[0].first}'s Dashboard</h2>
        <Button
          className="connect-button"
          variant="contained"
          color="secondary"
          onClick={getSearchData}
        >
          Call API{" "}
        </Button>
      </div>
    );
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
    });
  };

  const getSearchData = () => {
    API.getSearch().then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      <Greeting isLoggedIn={connectionState} />
    </>
  );
};

export default Dashboard;
