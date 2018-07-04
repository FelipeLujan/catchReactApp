import React, { Component } from "react";
import PropTypes from "prop-types";

class EditFishForm extends Component {
  static propTypes = {
    updateFish: PropTypes.func,
    index: PropTypes.string,
    fish: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    })
  };
  handleChange = event => {
    /*currentTarget is the element on which the event was called (input boxes in this case)*/
    /*still, react wont update the state given the input value, changes must be done directly in state*/
    /*event.currentTarget.name gives back the name of the field that was touched (every input must have a name for this
      to work)*/

    //1. take a copy of the current fish (updating fish from EditFishForm is covered in lecture 20)
    const updatedFish = {
      ...this.props.fish,
      /*update this.prop.name: value*/
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className={"fish-edit"}>
        <input
          type="text"
          placeholder={"Name"}
          name={"name"}
          value={this.props.fish.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder={"price"}
          name={"price"}
          value={this.props.fish.price}
          onChange={this.handleChange}
        />
        <select
          name={"status"}
          value={this.props.fish.status}
          onChange={this.handleChange}
        >
          <option value="available">Fresh!</option>
          <option value="unavaliable">Sold Out!</option>
        </select>
        <textarea
          placeholder="Description"
          name={"desc"}
          value={this.props.fish.desc}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name={"image"}
          value={this.props.fish.image}
          onChange={this.handleChange}
        />
        <button
          onClick={() => {
            this.props.deleteFish(this.props.index);
          }}
          className="delete"
        >
          Delete Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
