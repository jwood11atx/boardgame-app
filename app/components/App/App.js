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
    fetch("http://localhost:3000/hotness")
      .then(res => res.json())
      .then(hotness => this.props.getHotness(hotness))
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
    .then(games => {
      this.props.getSearchResults(games)
    })
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
      fetch(`http://localhost:3000/search?id=
        ${this.state.searchInput}${this.exact()}`)
      .then(res => res.json())
      .then(ids => {
        ids = ids.sort((a, b) => {
          return Number(a) - Number(b);
        })

        if(document.getElementById("show-newest-checkbox").checked)
          ids = ids.reverse();

        this.props.getSearchIDs(ids);

        if (ids.length < 10) {
          ids = ids.join(",");
          this.getGames(ids);
        } else {
          ids = ids.slice(0, 10).join(",");
          this.getGames(ids);
        }
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
        <p>Search for a boardgame</p>
        <input type="text"
               placeholder="search here!"
               onChange={e => this.setState({searchInput: e.target.value})}
               onKeyDown={e => this.enterKey(e)}/>
        {this.searchButton()}
        <input type="checkbox"
               id="exact-match-chechbox"/>
               <label>exact match</label>
        <input type="checkbox"
              id="show-newest-checkbox"/>
              <label>show newest</label>

        {this.props.children}
      </div>
    );
  }
}

export default AppContainer(SearchContainer(HotnessContainer(App)));
