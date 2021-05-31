import React from "react";
import BackgroundSmall from "../../images/background-small.jpg";
import Backgroundlarge from "../../images/background-large.jpg";
import Button from "@material-ui/core/Button";
import "./style.css";
import { Link } from "react-router-dom";

const small = BackgroundSmall;
const large = Backgroundlarge;

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1 id="home-h1">
          Grow your traffic organically
          <br />
          with SEO Dashboard <br />
          <Link style={{ textDecoration: "none" }} to="/signup">
            {" "}
            <Button variant="contained" color="secondary">
              Get Started
            </Button>
          </Link>
        </h1>

        <img
          src={small}
          srcSet={`${small} 300w, ${small} 768w, ${large} 1280w,`}
          className="background-image"
        />
      </div>
    );
  }
}

export default Home;
