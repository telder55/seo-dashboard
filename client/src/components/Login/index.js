import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function LoginForm() {
  let history = useHistory();
  const classes = useStyles();
  const [formObject, setFormObject] = useState({});

  useEffect(() => {}, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({
      ...formObject,
      [name]: value,
      error: false,
      errortext: false,
      pass: false,
      passtext: false,
    });
  }

  function handleLogin(event) {
    event.preventDefault();
    API.checkUser(formObject.email).then((res) => {
      if (res.data == null) {
        setFormObject({
          ...formObject,
          error: true,
          errortext: "Invalid Username or password",
        });
      } else if (validateUser(formObject.email, formObject.password) === true) {
        API.saveUser({
          first: formObject.first,
          last: formObject.last,
          email: formObject.email,
          password: formObject.password,
        })
          .then((res) => {
            let url = "/dashboard";
            history.push(url);
          })
          .catch((err) => console.log(err));
      }
    });
  }

  function validateUser() {
    return true;
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          name="email"
          label="Email Address"
          onChange={handleInputChange}
          error={formObject.error}
          helperText={formObject.errortext}
        />{" "}
        <br />
        <TextField
          name="password"
          label="Password"
          onChange={handleInputChange}
          type="password"
          autoComplete="current-password"
        />{" "}
        <br />
      </div>
      <Button
        variant="contained"
        disabled={!(formObject.email && formObject.password)}
        onClick={handleLogin}
      >
        Login
      </Button>
    </form>
  );
}
