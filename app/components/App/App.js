import React from 'react';
import {firebase, database} from "../../../firebase";
import AppContainer from "../../containers/AppContainer/AppContainer";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";
import HotnessContainer from "../../containers/HotnessContainer/HotnessContainer";
import Header from "../Header/Header";
import {Link} from "react-router";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      searchInput: ""
    }
  }

  componentDidMount(){
    fetch("/api/v1/hotness")
      .then(res => res.json())
      .then(hotness => this.props.getHotness(hotness))
  };

  render(){
    return (
      <div className="App">
        <Header />
        <div className="page-layout">
          {/* <div className="search-bar">
            <p className="header-text">Search for a boardgame</p>
            <input type="text"
                   placeholder="search here!"
                   onChange={e => this.setState({searchInput: e.target.value})}
                   onKeyDown={e => this.enterKey(e)}/>
            {this.searchButton()}
            <input type="checkbox"
                   id="exact-match-chechbox"/>
                   <label className="header-text">exact match</label>
            <input type="checkbox"
                  id="show-newest-checkbox"/>
                  <label className="header-text">show newest</label>
          </div> */}

          <div className="page-display">
            {this.props.children}
          </div>
        </div>

        <footer>All data sourced from <a href="https://www.boardgamegeek.com">BoardGameGeek  </a>
        <img id="bgg-logo" src="//cf.geekdo-static.com/images/logos/bgg.png" />
      </footer>
      </div>
    );
  }
}

export default AppContainer(SearchContainer(HotnessContainer(App)));
