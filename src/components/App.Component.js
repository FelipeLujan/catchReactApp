/*THIS WILL GO THIS WAY
* 1. IMPORTS
* 2. STATE
* 3. LIFECYCLE METHODS
* 5. CUSTOM STUFF
* 6. RENDER*/

import React from "react";
import PropTypes from "prop-types";

import HeaderComponent from "./HeaderComponent";
import OrderComponent from "./OrderComponent";
import InventoryComponent from "./InventoryComponent";
import sampleFishes from "../sample-fishes";
import FishComponent from "./FishComponent";
import base from "../base";

class AppComponent extends React.Component {
  //every component  can have it's own state
  //state can be passed down from component to component via props, which means it cant be passed up to a higher
  //lvl component, so...

  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;
    //params.storeId is the name of the store passed as param from the router component
    // its stored in this.props.match.params.storeId

    /*first thing to do is reinstate the localstorage from previous sessions, IF there is any*/
    const localStoreRef = localStorage.getItem(this.props.match.params.storeId);

    if (localStoreRef) {
      this.setState({ order: JSON.parse(localStoreRef) });
    }
    // 1. take the string from localStorage if any previous session saved it
    //2. convert it to and object and reintate state
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
    /*this is how i implement rebase
    * the state is synced on componentDidMount */
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    console.log("fish added");
    //in order to insert the fish into the state
    // 1. take a copy of the existing state
    const newFish = { ...this.state.fishes };

    //2. add the new fish to the newFish variable
    newFish[`fish${Date.now()}`] = fish;

    //3 update state
    this.setState({
      fishes: newFish
    });
  };

  updateFish = (key, updatedFish) => {
    /*1. take a copy of the current fish*/
    const fishes = { ...this.state.fishes };

    /*2. update state*/
    fishes[key] = updatedFish;

    /*3. set to state*/
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  deleteFish = key => {
    //1. take a copy of state
    const fishes = { ...this.state.fishes };

    //2. update the fishes copy
    fishes[key] = null;

    //3. update state
    this.setState({ fishes });
  };

  addToOrder = key => {
    //1. take a copy of state
    const order = { ...this.state.order };

    //2. add to the order or update quantity
    order[key] = order[key] + 1 || 1;
    //this means that if order[key] = order[key] then + 1, otherwise set state to 1

    //3. call setstate to update order state
    this.setState({
      order: order
      //this.setState({order)} is the same
    });
  };

  deleteFromOrder = key => {
    //1. take a copy of state
    const order = { ...this.state.order };

    //2. remove item from order, we dont need to set this to null because we are not sending this to firebase
    delete order[key];

    //3. call setstate to update order state
    this.setState({
      order: order
    });
  };

  /*============================================    R E N D E R    =======================================*/

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <HeaderComponent tagline={"Felipe is Cool"} age={26} />
          {/*this is a pomponent instance, with certain props. Another instance could be initiated with different props*/}
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <FishComponent
                key={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
                index={key}
                //the prop "key" doesn't pass as an actual prop, it's a keyword reserved to react
                //so, in order to be able to grab the key, it must be passed as another prop, in this case "index"
              />
            ))}
          </ul>
        </div>

        <OrderComponent
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}
        />
        {/*<OrderComponent {...this.state} />
        this passes the entire state, even thing created at a later time would be passed*/}

        <InventoryComponent
          fishes={this.state.fishes}
          addFish={this.addFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          updateFish={this.updateFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default AppComponent;
