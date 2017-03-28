import "./reset.css";
import "./styles.css";
import React from "react"
import { render } from "react-dom"
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';

import App from "./components/App/App";
import Hotness from "./components/Hotness/Hotness";
import Search from "./components/Search/Search";
import Favorites from "./components/Favorites/Favorites";
import Recommendations from "./components/Recommendations/Recommendations";
import BGDetailPage from "./components/BGDetailPage/BGDetailPage";

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Hotness} />
        <Route path="/search" component={Search} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/recommendations" component={Recommendations} />
        <Route path="/boardgame/:name" component={BGDetailPage} />
      </Route>
    </Router>
  </Provider>
)


render(router, document.querySelector(".application"));
