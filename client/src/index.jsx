import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// Bundle ./index.scss
import "./index.scss";

const store = createStore(moviesApp);

//Main component
class RottenPotatoes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

//Find the root of the app
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render the app in the room DOM element
ReactDOM.render(React.createElement(RottenPotatoes), container);
