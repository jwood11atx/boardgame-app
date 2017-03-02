import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import RecommendationsContainer from "../../containers/RecommendationsContainer/RecommendationsContainer";
import BoardgameCards from "../BoardgameCards/BoardgameCards";


class Recommendations extends React.Component{
  constructor(){
    super();
    this.state = {
      matchList: [],
      matachedDBList: []
    }
  }

  getRecommendations(){
    const app = this;
    let recommendations;

    this.getGames().then(() => {
      const promise = new Promise((resolve) => {
        const list = this.props.favoritesIDs;
        if(list.length){
          const xmlList = list[list.length-1]["xml"];
          if (xmlList){
            app.getXML(xmlList, "favoritesIDs");
            setTimeout(()=>{
              resolve();
            }, 3000)
          } else {
            resolve();
          }
        }
      })

      promise.then((test) => {
        app.getMatches()
          .then(() => {
            let recommendationObj =
            this.state.matchList.reduce((obj, id) => {
              let newObj = obj;
              if (obj[id]){
                newObj[id]++;
              } else {
                newObj[id] = 1;
              }
              return newObj;
            }, {});

            recommendations =
              Object.keys(recommendationObj).sort(function(a,b){
                return recommendationObj[b]-recommendationObj[a];
              }).splice(0,10);

            app.getXML(recommendations, "recommendations")
          })
      })
    })
  }

  getMatches(){
    this.setState({matchList: []})
    let promise;
    this.state.matachedDBList.forEach(game => {
      Object.keys(game).forEach(key => {
        if(game[key].indexOf("N/A") === -1){
          console.log(game);
          const value = game[key].join(",");
          promise = fetch(`http://localhost:3000/recommendation?${key}=${value}`)
          .then(res => res.json())
          .then(idArr => {
            idArr.forEach((id, i) => {
              if(this.props.favoritesIDs.indexOf(id) === -1){
                this.setState({matchList: [...this.state.matchList, id]})
              }
            })
          })
        }
      })
    })
    return promise
  }

  getGames(){
    const ids = this.props.favoritesIDs.join(",");
    const app = this;

    return fetch(`http://localhost:3000/boardgames?id=${ids}`)
      .then(res => res.json())
      .then(matachedDBList => {
        this.setState({matachedDBList})
      })
  }

  getXML(list, action){
    if (action === "favoritesIDs") {
      fetch(`http://localhost:3000/xml?id=${list.join(",")}`)
      .then(res => res.json())
      .then(data => {
        const bglist = this.state.matachedDBList;
        bglist.pop();
        this.setState({matachedDBList: [...bglist, ...data]})
      })
    } else if(action === "recommendations"){
      fetch(`http://localhost:3000/list?id=${list.join(",")}`)
      .then(res => res.json())
      .then(data => {
        this.props.getRecommendations(data)
        // this.setState({recommendations: data})
      })
    }
  }

  render(){
    return (
      <div>
        <button onClick={() => this.getRecommendations()}>get recommendations</button>
        <BoardgameCards path={this.props.location.pathname} />
      </div>
    )
  }

}

export default RecommendationsContainer(AppContainer(Recommendations))
