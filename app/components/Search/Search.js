import React from "react";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";

class Search extends React.Component{
  constructor(){
    super();
    this.state = {
      displayed: 10
    }
  }

  getNextTen(){
    let {searchIDs} = this.props;
    let {displayed} = this.state;
    let ids = "";

    ids = searchIDs.splice(displayed, 10).join(",");
    this.getGames(ids);
    displayed += 10;
    this.setState({displayed: displayed});
  }

  getGames(ids){
    fetch(`http://localhost:3000/list?id=${ids}`)
    .then(res => res.json())
    .then(games => this.props.getSearchResults(games))
  }

  displaySearchResults(){
    const {searchResults} = this.props;
    return searchResults.map((game, i) => {
      return <img key={i} src={game.thumbnail}/>
    })
  };

  render(){
    return (
      <div>
        <h2>SEARCH RESULTS!</h2>
        {this.displaySearchResults()}
        <button onClick={() => this.getNextTen()}>display next 10</button>
      </div>
    )
  }

};

export default SearchContainer(Search);
