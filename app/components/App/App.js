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

  exact(){
    const checkbox = document.getElementById("exact-match-chechbox");
    if(checkbox.checked){
      return "&exact=1"
    } else {
      return "&exact=0";
    }
  }

  getSearch(){
    this.props.clearSearchIDs();
    this.props.clearSearchResults();
    if(this.state.searchInput){
      fetch(`/api/v1/search?id=${this.state.searchInput}${this.exact()}`)
      .then(res => res.json())
      .then(boardgames => {


        if (boardgames.length > 1) {
          boardgames.sort((a,b) => {
            return a.id - b.id;
          });

          if(document.getElementById("show-newest-checkbox").checked)
            boardgames = boardgames.reverse();

        }

        this.props.getSearchResults(boardgames)
      })
    }
  }

  searchButton(){
    if(this.state.searchInput){
      return (
        <Link id="search-link"
              to="/search"
              onClick={() => this.getSearch()}>
        <button>search</button>
      </Link>
      )
    } else {
      return <button disabled="true">search</button>
    }
  }

  enterKey(e){
    if(e.nativeEvent.key === "Enter"
       && document.querySelector("#search-link")){
      document.querySelector("#search-link").click();
    }
  }

  render(){
    return (
      <div className="App">
        <Header />
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

        {this.props.children}
        <footer>All data sourced from <a href="https://www.boardgamegeek.com">BoardGameGeek  </a>
        <img id="bgg-logo" src="//cf.geekdo-static.com/images/logos/bgg.png" />
      </footer>
      </div>
    );
  }
}

export default AppContainer(SearchContainer(HotnessContainer(App)));
