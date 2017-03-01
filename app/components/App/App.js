import React from 'react';
import {firebase, database} from "../../../firebase";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      userBGList: [],
      userBGListIDs: ["42", "13", "93", "192291", "3076"],
      matchList: [],
      data: {},
      hotness: [],
      recommendations: []
    }
  }
  componentDidMount(){
    fetch("http://localhost:3000/hotness")
      .then(res => res.json())
      .then(hotness => this.setState({hotness}))
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
    const ids = this.state.userBGListIDs.join(",");
    const app = this;

    return fetch(`http://localhost:3000/boardgames?id=${ids}`)
      .then(res => res.json())
      .then(userBGList => {
        this.setState({userBGList})
      })
  }

  getXML(list, action){
    if (action === "userBGList") {
      fetch(`http://localhost:3000/xml?id=${list.join(",")}`)
      .then(res => res.json())
      .then(data => {
        const bglist = this.state.userBGList;
        bglist.pop();
        this.setState({userBGList: [...bglist, ...data]})
      })
    } else if(action === "recommendations"){
      fetch(`http://localhost:3000/list?id=${list.join(",")}`)
      .then(res => res.json())
      .then(data => {
        this.setState({recommendations: data})
      })
    }
  }

  getRecommendations(){
    const app = this;
    let recommendations;
    this.setState({ matchList: [],
                    recommendations: [],
                    userBGList: [],
                 });
    this.getGames().then(() => {
      const promise = new Promise((resolve) => {
        const list = this.state.userBGList;
        const xmlList = list[list.length-1]["xml"];
        if (xmlList){
          app.getXML(xmlList, "userBGList");
          setTimeout(()=>{
            resolve();
          }, 3000)
        } else {
          resolve();
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
    this.state.userBGList.forEach(game => {
      Object.keys(game).forEach(key => {
        if(game[key].indexOf("N/A") === -1){
          const value = game[key].join(",");
          promise = fetch(`http://localhost:3000/recommendation?${key}=${value}`)
          .then(res => res.json())
          .then(idArr => {
            idArr.forEach((id, i) => {
              if(this.state.userBGListIDs.indexOf(id) === -1){
                this.setState({matchList: [...this.state.matchList, id]})
              }
            })
          })
        }
      })
    })
    return promise
  }

  game(){
    if(Object.keys(this.state.data) != 0)
      return <img className="image" src={this.state.data.image}></img>
  }

  render(){
    console.log("state", this.state.recommendations);
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
