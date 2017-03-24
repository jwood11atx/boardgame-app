import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";
import BoardgameCard from "../BoardgameCards/BoardgameCards";

class Search extends React.Component{
  constructor(){
    super();
    this.state = {
      displayed: 10
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

  getMoreButton(){
    if(this.state.displayed < this.props.searchIDs.length){
      return <button className="more-button"
                     onClick={() => this.getNextTen()}>get more!</button>
    } else {
      return <button className="more-button"
                     disabled="true">get more!</button>
    }
  }


  render(){
    return (
      <div className="boardgames-container">
        <h2 className="page-title">Search Results!</h2>
        <section className="bg-img-container">
          <BoardgameCard path={this.props.location.pathname} />
        </section>
        {this.getMoreButton()}
      </div>
    )
  }

};

export default SearchContainer(AppContainer(Search));
