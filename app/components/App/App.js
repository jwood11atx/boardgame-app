import React from 'react';
import {firebase, database} from "../../../firebase";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      userBGList: [],
      userBGListIDs: ["148228", "13", "60131", "1666", "150376", "3263"],
      matchList: [],
      data: {},
      hotness: [],
      recommendations: []
    }
  }
  componentDidMount(){
    // "145976", "119673", "3263"
// "148228", "13", "60131", "1666", "150376"
    ////////////MAKE THIS A BACKEND CALL//////////////////////////
    // const app = this;
    // database.ref("Boardgames").once("value")
    //   .then(function(snapshot){
    //     let database = snapshot.val();
    //     let listIDs = Object.keys(database);
    //     console.log("database", database);
    //     listIDs.map(bgID => database[bgID] = JSON.parse(bgID));
    //     app.setState({database});
    //   })
    // fetch("https://bgg-json.azurewebsites.net/hot")
    // .then(res => res.json())
    // .then(hotness => this.setState({hotness}))
  };

  mechanics(){
    let arr = [];
    if(this.state.data.mechanics){
      this.state.data.mechanics.forEach((e, i) => {
        return arr.push(<li key={i}>{e}</li>)
      })
    }
    return arr;
  };

  hotness(){
    let arr = [];
    if(this.state.hotness.length > 0){
      this.state.hotness.forEach((e, i) => {
        return arr.push(<img key={i} src={e.thumbnail}></img>)
      })
    }
    return arr;
  }

  getGames(){
    var ids = this.state.userBGListIDs.join(",");
    var app = this;
    var count = 0;
    var list = []

    return fetch(`http://localhost:3000/boardgames?id=${ids}`)
      .then(res => res.json())
      .then(userBGList => {
        this.setState({userBGList})
      })
    return list;
  }

  getXML(){
    let list = this.state.userBGList;
    let found = false;
    let count = 0;
    for(let i=0; list.length>i; i++){
      if(list[i]["xml"]){
        fetch(`http://localhost:3000/xml?id=${list[i]["xml"]}`)
          .then(res => res.json())
          .then(data => {
            list[i] = data;
            this.setState({userBGList: list})
          })
      }
    }
  }

  getRecommendations(){
    var app = this;
    this.getGames().then(() => {
      var promise = new Promise((resolve) => {
      app.getXML()
      setTimeout(()=>{
        resolve();
      }, 1000)
      })

      promise.then((test) => {
        app.getMatches()
          .then(() => {
            var recommendations =
            this.state.matchList.reduce(function(obj, id){
              var newObj = obj;
              if (obj[id]){
                newObj[id]++;
              } else {
                newObj[id] = 1;
              }
              return newObj;
            }, {})
            this.setState({recommendations})
          })
      })
    })


  }

  getMatches(){
    this.setState({matchList: []})
    var promise;
    this.state.userBGList.forEach(game => {
      Object.keys(game).forEach(key => {
        var value = game[key].join(",")
        promise = fetch(`http://localhost:3000/recommendation?${key}=${value}`)
        .then(res => res.json())
        .then(idArr => {
          idArr.forEach((id, i) => {
            if(this.state.userBGListIDs.indexOf(id) === -1)
            this.setState({matchList: [...this.state.matchList, id]})
          })
        })
      })
    })
    return promise
  }

  game(){
    if(Object.keys(this.state.data) != 0)
      return <img className="image" src={this.state.data.image}></img>
  }

  render(){
    console.log(this.state);
    return (
      <div className="App">
        <h1>app</h1>
        <button onClick={() => {
          this.getRecommendations()}}>click me</button>
        {this.game()}
        {this.mechanics()}
        {this.hotness()}
      </div>
    );
  }
}

export default App;
