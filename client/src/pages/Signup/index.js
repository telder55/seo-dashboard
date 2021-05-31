import React from "react";
import SignupForm from "../../components/Signup";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <h1>Signup to start tracking your traffic</h1>
          <p>
            Already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/login">
              Login Here
            </Link>
          </p>
          <SignupForm />
        </Container>
      </div>
    );
  }
}

export default Signup;
