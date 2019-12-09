import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';

// Bundle ./index.scss
import "./index.scss";

//Main component
class RottenPotatoes extends React.Component {
  render() {
    return <MainView />;
  }
}

//Find the root of the app
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render the app in the room DOM element
ReactDOM.render(React.createElement(RottenPotatoes), container);
