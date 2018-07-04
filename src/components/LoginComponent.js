import React, { Component } from "react";
import PropTypes from "prop-types";

const LoginComponent = props => (
  <nav className={"login"}>
    <h2>Inventory Login</h2>
    <p>Sing up to manage your store inventory</p>
    <button
      className={"Github"}
      onClick={() => {
        props.authenticate("Github");
      }}
    >
      Github
    </button>
  </nav>
);

LoginComponent.propTypes = {
  authenticate: PropTypes.func.isRequired
};
export default LoginComponent;
