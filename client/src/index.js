import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import { loadState, saveState } from './utils/preloadedState';
import './index.css';

const preloadedState = loadState();
const store = createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
