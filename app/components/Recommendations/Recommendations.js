import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import RecommendationsContainer from "../../containers/RecommendationsContainer/RecommendationsContainer";
import BoardgameCards from "../BoardgameCards/BoardgameCards";


class Recommendations extends React.Component{
  getRecommendations(){
    const {favorites} = this.props;
    const favoritesIDs = this.props.favorites.map(favorite => favorite.id);

    fetch(`/api/v1/matched-bg-ids?id=${favoritesIDs.join(",")}`)
      .then(res => res.json())
      .then(list => {
        fetch(`/api/v1/bg-rec-list?id=${list.join(",")}`)
            .then(res => res.json())
            .then(data => {
              this.props.getRecommendations(data)
            })
            .catch(err => console.log(err))
      });
  };

  render(){
    return (
      <div>
        <h2 className="page-title">Recommendations!</h2>
        <button className="recommendation-button" onClick={() => this.getRecommendations()}>get recommendations</button>
        <BoardgameCards path={this.props.location.pathname}/>
      </div>
    )
  }
}

export default RecommendationsContainer(AppContainer(Recommendations))
