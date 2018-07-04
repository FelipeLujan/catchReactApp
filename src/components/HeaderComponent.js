import React, { Component } from "react";
import PropTypes from "prop-types";

class HeaderComponent extends Component {
  render() {
    return (
      <header className="top">
        <h1>
          catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          day
        </h1>
        <h3 className="tagline">
          <span> {this.props.tagline}</span>
        </h3>
      </header>
    );
  }
}

HeaderComponent.propTypes = {
  tagline: PropTypes.string.isRequired
};

export default HeaderComponent;
