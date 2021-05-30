import React from "react";
import BackgroundSmall from "../../images/background-small.jpg";
import Backgroundlarge from "../../images/background-large.jpg";
import Button from "@material-ui/core/Button";
import "./style.css";

const small = BackgroundSmall;
const large = Backgroundlarge;

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Grow your traffic organically
          <br />
          with SEO Dashboard <br />
          <Button variant="contained" color="secondary">
            Get Started
          </Button>
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
