import React from "react";
import ReactDOM from "react-dom";

// Bundle ./index.scss
import "./index.scss";

//Main component
class RottenPotatoes extends React.Componenet {
  render() {
    return (
      <div className="rotten-potatoes">
        <div>Good morning</div>
      </div>
    );
  }
}

//Finds the root of the app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render the app in the room DOM element
ReactDOM.render(React.createElement(RottenPotatoes), container);
