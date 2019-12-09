import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

// Bundle ./index.scss
import "./index.scss";

//Main component
class RottenPotatoes extends React.Component {
  constructor() {
    //Call superclass constructor
    super();
    //Initialise the state to an empty object which is to be destructured later
    this.state = {};
  }

  render() {
    return (
      <div className="main-view"></div>
    );
  }
}

//Finds the root of the app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render the app in the room DOM element
ReactDOM.render(React.createElement(RottenPotatoes), container);
