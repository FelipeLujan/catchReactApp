import React, { Component } from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

class OrderComponent extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    deleteFromOrder: PropTypes.func
  };
  renderOrder = key => {
    /*this second render function is created in order to tidy the original order function
    * in this one im running the checks to verify if the fish is still available*/

    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    // make a boolean to check whether the fish is available
    //and make sure the fish is loaded before i continue
    const transitionOptionsObject = {
      classNames: "order",
      key: key,
      timeout: {
        enter: 500,
        exit: 500
      }
    };
    if (!fish) return null;

    if (!isAvailable) {
      //if the fish is not available, trigger this return
      return (
        <CSSTransition {...transitionOptionsObject}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available.
          </li>
          {/*this ternary operator changes the return in case the fish is not  available */}
        </CSSTransition>
      );
    }

    return (
      <CSSTransition {...transitionOptionsObject}>
        {/*... operator pretty much spreads stuff to make it the same as this down below*/}
        {/*classNames={"order"}
          key={key}
          timeout={{
              enter: 500,
              exit: 500
          }}*/}
        <li key={key}>
          <span>
            <TransitionGroup component={"span"} className={"count"}>
              <CSSTransition
                classNames={"count"}
                key={count}
                timeout={{
                  enter: 5000,
                  exit: 5000
                }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button
              onClick={() => {
                this.props.deleteFromOrder(key);
              }}
            >
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  /*============================================    R E N D E R    =======================================*/

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];

      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    /*reduce needs to give a 0 in case no calculation takes place
    * the total price is calculated independently from renderOrder*/

    return (
      <div className={"order-wrap"}>
        <h2>Order</h2>
        <TransitionGroup component={"ul"} className={"order"}>
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        {/*an UL will be rendered with the result of  renderOrder which checks whether or not the fish is available
        and it's price*/}

        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default OrderComponent;
