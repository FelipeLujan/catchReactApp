import React, { Component } from "react";
import AddFishFormComponent from "./AddFishFormComponent";
import EditFishForm from "./EditFishForm";
import LoginComponent from "./LoginComponent";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

import PropTypes from "prop-types";

class InventoryComponent extends Component {
  static propTypes = {
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    fishes: PropTypes.object,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  authHandler = async authData => {
    /*authdata gets back kind of a payload back from the popup*/

    //1. look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);

    //2. Claim the store if there is no owner (when user is the first to use it).
    if (!store.owner) {
      //save it as out own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
        // grab uid from github loggin and passes it as the uid to the database
      });
    }

    //3. create state of inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid /*figure out who is the current user*/,
      owner: store.owner || authData.user.uid
      /*figure out who is the owner of the store*/
      /*if the are the same, then allow the user to manage the store*/
    });
  };

  authenticate = provider => {
    /*here ill create an auth provider based on what the user wants to sing in with*/
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();

    /*the user will deal with the pupup for a while*/
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
    /*then i get data from the popup*/
  };

  logout = async () => {
    console.log("logging you out");
    await firebase.auth().signOut();
    this.setState({
      uid: null
    });
  };

  /*============================================    R E N D E R    =======================================*/
  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    //1.  Check if user is logged in
    if (!this.state.uid) {
      return <LoginComponent authenticate={this.authenticate} />;
    }
    //  2. check if the user is NOT the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          {logout}
          <p>Sorry, you are not the owner of this store</p>
        </div>
      );
    }

    //if the previous checks passed, the user must be the owner, render inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            fish={this.props.fishes[key]}
            key={key}
            index={key}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        {/*props.fishes is an object, so here i get the keys from it
        then i render a EditFishFrom for each one
        then pass a prop named fish for every fish in the fishes prop here in InventoryComponent
        and also pass the key for each one*/}
        <AddFishFormComponent addFish={this.props.addFish} />
        {/*add fish is passed via props, it doesn't live in the inventoryComponent*/}
        {/*Load Samples*/}
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default InventoryComponent;
