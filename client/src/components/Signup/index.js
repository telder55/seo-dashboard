import React, { useState } from "react";
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

export default function SignupForm() {
  let history = useHistory();
  const classes = useStyles();
  const [formObject, setFormObject] = useState({});

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

  function handleFormSubmit(event) {
    event.preventDefault();
    API.checkUser(formObject.email).then((res) => {
      if (res.data !== null) {
        setFormObject({
          ...formObject,
          error: true,
          errortext: "That email has already been taken!",
        });
      } else if (
        formObject.first &&
        formObject.last &&
        validateEmail(formObject.email) === true &&
        validatePassword(formObject.password, formObject.confirm)
      ) {
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

  function validateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      setFormObject({
        ...formObject,
        error: false,
        errortext: false,
      });
      return true;
    }
    //^([@#](?=[]{7,13}$)(?=[[:alnum:]]{7,13}$)(?=.*[A-Z]{1,}.*$).+)$

    setFormObject({
      ...formObject,
      error: true,
      errortext: "Please enter a valid email like 'email@example.com'",
    });
    return false;
  }

  function validatePassword(p1, p2) {
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(p1)) {
      setFormObject({
        ...formObject,
        pass: true,
        passtext: "Check password format",
      });
      return false;
    } else if (p1 !== p2) {
      setFormObject({
        ...formObject,
        pass: true,
        passtext: "Password does not match!",
      });
      return false;
    }
    setFormObject({
      ...formObject,
      pass: false,
      passtext: false,
    });
    return true;
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
          helperText="Must be between 7-15 characters and include at least one number and one special character "
          type="password"
          autoComplete="current-password"
        />{" "}
        <br />
        <TextField
          required
          name="confirm"
          label="Confirm Password"
          onChange={handleInputChange}
          error={formObject.pass}
          helperText={formObject.passtext}
          type="password"
          autoComplete="current-password"
        />
      </div>
      <Button
        variant="contained"
        disabled={
          !(
            formObject.first &&
            formObject.last &&
            formObject.email &&
            formObject.confirm
          )
        }
        onClick={handleFormSubmit}
      >
        Create Account
      </Button>
    </form>
  );
}
