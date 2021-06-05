// Take 'disabled' attribute off of Button when form can be submitted.
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function SignupForm() {
  const classes = useStyles();
  const [formObject, setFormObject] = useState({});

  useEffect(() => {}, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    console.log(formObject.email);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (
      formObject.first &&
      formObject.last &&
      ValidateEmail(formObject.email) === true
    ) {
      API.saveUser({
        first: formObject.first,
        last: formObject.last,
        email: formObject.email,
        password: formObject.password,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }

  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }

    setFormObject({
      ...formObject,
      error: true,
      errortext: "Please enter a valid email like 'email@example.com'",
    });
    // alert("You have entered an invalid email address!");
    return false;
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          required
          name="first"
          label="First Name"
          onChange={handleInputChange}
        />{" "}
        <br />
        <TextField
          required
          name="last"
          label="Last Name"
          onChange={handleInputChange}
        />{" "}
        <br />
        <TextField
          required
          name="email"
          label="Email Address"
          onChange={handleInputChange}
          error={formObject.error}
          helperText={formObject.errortext}
        />{" "}
        <br />
        <TextField
          required
          name="password"
          label="Password"
          onChange={handleInputChange}
          type="password"
          autoComplete="current-password"
        />{" "}
        <br />
        <TextField
          required
          name="confirm"
          label="Confirm Password"
          onChange={handleInputChange}
          type="password"
          autoComplete="current-password"
        />
      </div>
      <Button
        variant="contained"
        disabled={!(formObject.first && formObject.last)}
        onClick={handleFormSubmit}
      >
        Create Account
      </Button>
    </form>
  );
}
