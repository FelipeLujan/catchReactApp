import React from "react";
import PropTypes from "prop-types";

import { getFunName } from "../helpers";

class StorepickerComponent extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };
  /*constructor (){
        super();
        this.goToStore = this.goToStore.bind(this);
    }*/
  //this is the way we bind the constructor to the component,so the constructors parent element is the storepicker
  //although it cn be done with ES6 arrow function

  myInput = React.createRef();

  goToStore = event => {
    /*1. stop default behavior (form submit on send)*/
    event.preventDefault();

    /*2. get the input value*/

    const storeName = this.myInput.value.defaultValue;
    //first .value is a react thing that retrieves the object, the second one gives the actual value

    /*3. change the url to the storeName the user selected*/

    this.props.history.push(`/store/${storeName}`);
  };

  /*============================================    R E N D E R    =======================================*/
  render() {
    /*render() method cannot return nothing*/
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>please enter a store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder={"Store Name"}
          defaultValue={getFunName()}
        />
        {/*passing defaultValue={getFunName()} will call and run the function onpageload, because of the ()*/}
        <button type="submit"> Visit Store!</button>
      </form>
    );
  }
}
/*return is not a function, its a keyword, so there has to be a space, like this return ().
* Also, 1 and only 1 element has to be returned, that element can contain multiple elements tho.
* but retuning something sich as:
* <p></p>
*  <div></div>
*  will result in an error, even returnin a comment and another element (as siblings) will throw an error
*
* */

export default StorepickerComponent;
