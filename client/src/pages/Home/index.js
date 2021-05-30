import React from "react";
import BackgroundSmall from "../../images/background-small.jpg";
import Backgroundlarge from "../../images/background-large.jpg";
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
          with SEO Dashboard
        </h1>
        <img
          src={small}
          srcSet={`${small} 300w, ${small} 768w, ${large} 1280w,`}
          className="background-image"
          onLoad={this.onLoad}
        />
      </div>
    );
  }
}

export default Home;
