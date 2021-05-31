// Take 'disabled' attribute off of Button when form can be submitted.

import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="First Name" /> <br />
        <TextField required id="standard-required" label="Last Name" /> <br />
        <TextField
          required
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />{" "}
        <br />
        <TextField
          required
          id="standard-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
        />
      </div>
      <Button variant="contained" disabled>
        Create Account
      </Button>
    </form>
  );
}
