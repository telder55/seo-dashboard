import React from "react";
import SignupForm from "../../components/Signup";
import Container from "@material-ui/core/Container";

class Signup extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <h1>Signup to start tracking your traffic</h1>
          <SignupForm />
        </Container>
      </div>
    );
  }
}

export default Signup;
