import React from "react";
import {Link} from "react-router";
import Nav from "../Nav/Nav";
import {firebase, database, auth} from "../../../firebase";
import UserContainer from "../../containers/UserContainer/UserContainer";
import AppContainer from "../../containers/AppContainer/AppContainer";


class Header extends React.Component{
  constructor(){
    super();
    this.state = {
      emailInput: "",
      passwordInput: ""
    }
  }

  buttonDisplay(buttons){
    return buttons;
  }

  signUp(){
    fetch("/api/v1/signup", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.state.emailInput,
              password: this.state.passwordInput
            })
          })
          .then(res => res.json())
          .then(json => console.log(json))
  }

  signIn(){
    fetch("/api/v1/signin", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.state.emailInput,
              password: this.state.passwordInput
            })
          })
          .then(res => res.json())
          .then(user => this.props.getUser(user));
  }

  signOut(){
    fetch("/api/v1/signout")
      .then(res => res.json())
      .then(json => this.props.getUser([]))
  }

  enterKey(e){
    if(e.nativeEvent.key === "Enter"
       && document.querySelector("#signin-btn")){
      document.querySelector("#signin-btn").click();
    }
  }

  render(){
    return (
      <div className="Header">
        <h1 className="logo">Boardgame It!</h1>
        <div id="auth-container">
          <input type="text"
                 placeholder="email"
                 onChange={e => this.setState({emailInput: e.target.value})}
                 onKeyDown={e => this.enterKey(e)}/>
          <input type="text"
                 placeholder="password"
                 onChange={e => this.setState({passwordInput: e.target.value})}
                 onKeyDown={e => this.enterKey(e)}/>

          <button id="signin-btn" onClick={() => this.signIn()}>sign in!</button>
          <button id="signin-btn" onClick={() => this.signUp()}>sign up!</button>
          <button onClick={() => this.signOut()}>sign out!</button>
        </div>
        <div>
          <Nav />
        </div>
      </div>
    );
  }
}

export default AppContainer(UserContainer(Header));
