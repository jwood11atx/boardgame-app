import React from 'react';

const logStuff = () => {
  console.log("clicked!");
}

const Header = () => {
  return (
    <div className="Header">
      <h1>Boardgame App</h1>
      <button onClick={() => {
        this.getRecommendations()}}>click me</button>
    </div>
  );
}

export default Header;
