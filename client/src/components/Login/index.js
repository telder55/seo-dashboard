import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const LoginForm = () => {
  let history = useHistory();
  const classes = useStyles();
  const [formError, setFormError] = useState({});
  const authContext = useContext(AuthContext);
  const [signInSuccess, setSignInSuccess] = useState();
  const [signInError, setSignInError] = useState();
  const [redirectOnSignIn, setRedirectOnSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [remember, setRemember] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormError({
      ...formError,
      error: false,
      errortext: false,
    });
  }

  const submitCredentials = async (credentials) => {
    try {
      const url = "/api/auth";
      const fetchResponse = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(credentials), // body data type must match "Content-Type" header
      });

      const data = await fetchResponse.json();
      data.token === undefined
        ? setFormError({
            ...formError,
            error: true,
            errortext: "Incorrect email or password",
          })
        : onSuccess(data);

      setSignInError(null);
    } catch (error) {
      setSignInError(error.message);
      setSignInSuccess(null);
    }
  };

  function onSuccess(data) {
    authContext.setAuthState(data);
    setSignInSuccess(data.message);
    setTimeout(() => {
      setRedirectOnSignIn(true);
    }, 700);
  }

  function handleLogin(e) {
    e.preventDefault();
    submitCredentials({ email, password });
  }

  return (
    <>
      {redirectOnSignIn && <Redirect to="/dashboard" />}
      {signInSuccess && <p>nice</p>}
      {signInError && <h1>Error: {signInError} </h1>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <div>
          <p className="error-text">{formError.errortext}</p>
          <TextField
            name="email"
            label="Email Address"
            onChange={(e) => setEmail(e.target.value.trim())}
          />{" "}
          <br />
          <TextField
            name="password"
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value.trim());
            }}
            type="password"
            autoComplete="current-password"
          />{" "}
          <br />
        </div>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
