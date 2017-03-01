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
    let ids = this.props.searchIDs;
    let start = this.state.displayed;
    let end = start+10;


    ids = ids.slice(start, end).join(",");
    this.getGames(ids);
    this.setState({displayed: end})
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

  getMoreButton(){
    if(this.state.displayed < this.props.searchIDs.length){
      return <button onClick={() => this.getNextTen()}>get more!</button>
    } else {
      return <button disabled="true">get more!</button>
    }
  }


  render(){
    return (
      <div>
        <h2>SEARCH RESULTS!</h2>
        {this.displaySearchResults()}
        {this.getMoreButton()}
      </div>
    )
  }

};

export default SearchContainer(Search);
