import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";
import BoardgameCard from "../BoardgameCards/BoardgameCards";
import {Link} from "react-router";


class Search extends React.Component{
  constructor(){
    super();
    this.state = {
      displayed: 10,
      searchInput: ""
    }
  }

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
      return <button className="search-button">search</button>
    } else {
      return <button className="search-button" disabled="true">search</button>
    }
  }

  enterKey(e){
    if(e.nativeEvent.key === "Enter"
       && document.querySelector("#search-button")){
      document.querySelector("#search-button").click();
    }
  }

  getNextTen(){
    let ids = this.props.searchIDs;
    let start = this.state.displayed;
    let end = start+10;


    ids = ids.slice(start, end).join(",");
    this.getGames(ids);
    this.setState({displayed: end})
  }

  getGames(ids){
    fetch(`/api/v1/list?id=${ids}`)
    .then(res => res.json())
    .then(games => {
      console.log(games);
      this.props.getSearchResults(games)
    })
  }

  displaySearchResults(){
    const {searchResults} = this.props;
    return searchResults.map((game, i) => {
      return <img key={i}
                  className="bg-image"
                  src={game.image} />
    })

  };

  // getMoreButton(){
  //   if(this.state.displayed < this.props.searchResults.length && this.props.searchResults > 0){
  //     return <button className="more-button"
  //                    onClick={() => this.getNextTen()}>get more!</button>
  //   } else {
  //     return <button className="more-button"
  //                    disabled="true">get more!</button>
  //   }
  // }


  render(){
    return (
      <div className="boardgames-container">
        <h2 className="page-title">Search!</h2>
        <input type="text"
               className="search-bar"
               placeholder="search here!"
               onChange={e => this.setState({searchInput: e.target.value})}
               onKeyDown={e => this.enterKey(e)}/>
        {this.searchButton()}
        <div className="search-checkbox-container">
          <input type="checkbox"
                 id="exact-match-chechbox"/>
                 <label className="header-text">exact match</label>
          <input type="checkbox"
                id="show-newest-checkbox"/>
                <label className="header-text">show newest</label>
        </div>
        <section className="bg-img-container">
          <BoardgameCard path={this.props.location.pathname} />
        </section>
        {/* {this.getMoreButton()} */}
      </div>
    )
  }

};

export default SearchContainer(AppContainer(Search));
