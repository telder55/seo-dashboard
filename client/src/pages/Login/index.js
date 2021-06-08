import React from "react";
import SignupForm from "../../components/Signup";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import LoginForm from "../../components/Login";

class Login extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <h1>Login</h1>
          <p>
            Don't have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/signup">
              Signup Here
            </Link>
          </p>
          <LoginForm />
        </Container>
      </div>
    );
  }
}

export default Login;
