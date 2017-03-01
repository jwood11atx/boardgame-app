import React from 'react';
import {firebase, database} from "../../../firebase";
import AppContainer from "../../containers/AppContainer/AppContainer";
import Header from "../Header/Header";
import {Link} from "react-router";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      searchInput: []
    }
  }

  componentDidMount(){
    // fetch("http://localhost:3000/hotness")
    //   .then(res => res.json())
    //   .then(hotness => this.props.getHotness(hotness));
  };

  // game(){
  //   if(Object.keys(this.state.data) != 0)
  //     return <img className="image" src={this.state.data.image}></img>
  // }
  //
  // // hotness(){
  // //   let arr = [];
  // //   if(this.state.hotness.length > 0){
  // //     this.state.hotness.forEach((e, i) => {
  // //       return arr.push(<img key={i} src={e.thumbnail}></img>)
  // //     })
  // //   }
  // //   return arr;
  // // }
  //
  // getGames(){
  //   const ids = this.state.userBGListIDs.join(",");
  //   const app = this;
  //
  //   return fetch(`http://localhost:3000/boardgames?id=${ids}`)
  //     .then(res => res.json())
  //     .then(userBGList => {
  //       this.setState({userBGList})
  //     })
  // }
  //
  // getXML(list, action){
  //   if (action === "userBGList") {
  //     fetch(`http://localhost:3000/xml?id=${list.join(",")}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       const bglist = this.state.userBGList;
  //       bglist.pop();
  //       this.setState({userBGList: [...bglist, ...data]})
  //     })
  //   } else if(action === "recommendations"){
  //     fetch(`http://localhost:3000/list?id=${list.join(",")}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({recommendations: data})
  //     })
  //   }
  // }
  //
  // getRecommendations(){
  //   const app = this;
  //   let recommendations;
  //   this.setState({ matchList: [],
  //                   recommendations: [],
  //                   userBGList: [],
  //                });
  //   this.getGames().then(() => {
  //     const promise = new Promise((resolve) => {
  //       const list = this.state.userBGList;
  //       const xmlList = list[list.length-1]["xml"];
  //       if (xmlList){
  //         app.getXML(xmlList, "userBGList");
  //         setTimeout(()=>{
  //           resolve();
  //         }, 3000)
  //       } else {
  //         resolve();
  //       }
  //     })
  //
  //     promise.then((test) => {
  //       app.getMatches()
  //         .then(() => {
  //           let recommendationObj =
  //           this.state.matchList.reduce((obj, id) => {
  //             let newObj = obj;
  //             if (obj[id]){
  //               newObj[id]++;
  //             } else {
  //               newObj[id] = 1;
  //             }
  //             return newObj;
  //           }, {});
  //
  //           recommendations =
  //             Object.keys(recommendationObj).sort(function(a,b){
  //               return recommendationObj[b]-recommendationObj[a];
  //             }).splice(0,10);
  //
  //           app.getXML(recommendations, "recommendations")
  //         })
  //     })
  //   })
  // }
  //
  // getMatches(){
  //   this.setState({matchList: []})
  //   let promise;
  //   this.state.userBGList.forEach(game => {
  //     Object.keys(game).forEach(key => {
  //       if(game[key].indexOf("N/A") === -1){
  //         const value = game[key].join(",");
  //         promise = fetch(`http://localhost:3000/recommendation?${key}=${value}`)
  //         .then(res => res.json())
  //         .then(idArr => {
  //           idArr.forEach((id, i) => {
  //             if(this.state.userBGListIDs.indexOf(id) === -1){
  //               this.setState({matchList: [...this.state.matchList, id]})
  //             }
  //           })
  //         })
  //       }
  //     })
  //   })
  //   return promise
  // }

  getGames(ids){
    fetch(`http://localhost:3000/list?id=${ids}`)
    .then(res => res.json())
    .then(games => this.props.getSearchResults(games))
  }

  getSearch(){
    fetch(`http://localhost:3000/search?id=${this.state.searchInput}`)
      .then(res => res.json())
      .then(ids => {
        this.props.getSearchIDs(ids);
        if (ids < 10) {
          ids = searchIDs.join(",");
          this.getGames(ids);
        } else {
          ids = ids.slice(0, 10).join(",");
          console.log(ids);
          this.getGames(ids);
        }
      })
  }

  render(){
    return (
      <div className="App">
        <Header />
        <p>Search for a boardgame</p>
        <input type="text"
               placeholder="search here!"
               onChange={e => this.setState({searchInput: e.target.value})}/>
        <Link to="/search" onClick={e => this.getSearch(e)}>
          <button>search</button>
        </Link>
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer(App);
