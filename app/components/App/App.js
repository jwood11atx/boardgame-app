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
//do request to express server
//(express)(routes comes with express i think) set routes namespaced like this: /api/v1/*
//example localhost:3000/api/v1/recommendations?query=catan,pandemic,splendor,resistance
//this route will send requests to a particular controller. that controller then handles the data manipulation and API calls to boardgamegeek. Once the data has been figured out, you will take that, convert it to JSON, and then return that data.

//you are going to want to pull in a libary to handle cors. follow the directions in the libary readme and it'll tell you how to set the cors headers accordingly. shouldn't be too hard.

//you still need firebase, but your backend/express app will the one communicating with your firebase db.


  getGames(){
      var ids = this.state.userBGListIDs.join(",");
      var app = this;
      var count = 0;
      var list = []

      return fetch(`http://localhost:3000/boardgames?id=${ids}`)
        .then(res => res.json())
        .then(userBGList => {
          // userBGList.forEach((e, i) => {
            // count++;
            // if(e["xml"]){
            //   fetch(`http://localhost:3000/xml?id=${e["xml"]}`)
            //     .then(res => res.json())
            //     .then(data => {
            //       userBGList[i] = data;
            //       // this.setState({userBGList})
            //     })
            // }
          // })
          // return userBGList;
          this.setState({userBGList})
        })
        // .then(function(userBGList){
        //   if (count === userBGList.length) {
        //     list = userBGList;
        //     app.setState({userBGList});
        //   }
        // })
        return list;
      // if(this.state.userBGList.length > 0){
      //   console.log(this.state.userBGList);
      // }

    // this.getMatches();






    // fetch("https://www.boardgamegeek.com/xmlapi2/thing?id=110308,13", {
      // })
      // .then(text => {
      //   const parser = new DOMParser();
      //   console.log("text", text);
      //   console.log("parser", parser);
      //   console.log("parser result", parser.parseFromString(text, "text/xml"));
      //   return parser.parseFromString(text, "text/xml");
      // })
      // .then(xml => console.log(xml))
      // .then(htmlText => {
        // console.log(htmlText)
        // console.log("designers", data.designers);
        // console.log("artists", data.artists);
        // console.log("publishers", data.publishers);
        // console.log("categories", data.categories);
        // console.log("mechanics", data.mechanics);
        // console.log("family", data.family);
      // })
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
      }, 500)
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

// var recommendationObj = recommendations([fakeEntry.stubENTRY1, fakeEntry.stubENTRY2]);
//
// console.log(recommendationObj);

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
