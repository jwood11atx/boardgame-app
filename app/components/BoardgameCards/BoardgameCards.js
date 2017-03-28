import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import FavoritesContainer from "../../containers/FavoritesContainer/FavoritesContainer";
import BGDetailsContainer from "../../containers/BGDetailsContainer/BGDetailsContainer";
import FavButton from "../FavButton/FavButton"
import {Link} from "react-router";

const BoardgameCard = (props) => {
  let display = [];

  const { searchResults,
          favorites,
          recommendations,
          hotness,
          path} = props;

  if(hotness.length === 0){
    return <p className="loading">loading...</p>

  } else if(path === "/search") {
      searchResults.map((game, i) => {
        if(game.name){
          display.push(
            <div key={i} className="bg-card"
                         id={game.id}>
               <img className="bg-image"
                     src={game.image}/>
               <div className="overlay"></div>
               <FavButton favID={game.id}
                         list={searchResults}/>
               <Link to={game.name[0] ? `/boardgame/${game.name}`
                                      : `/boardgame/details`}
                     onClick={() => addBGDetails(game.id, searchResults)}>
                 <button className="details-button">
                   view details
                 </button>
              </Link>
            </div>
          )
        } else {
          display = <div key={1}>Nothing Found!</div>;
        }
      })

  } else if(path === "/favorites") {
    favorites.map((game, i) => {
      display.push(
        <div key={i} className="bg-card"
                     id={game.id}>
           <img className="bg-image"
                 src={game.image}/>
           <div className="overlay"></div>
           <FavButton favID={game.id}
                     list={favorites}/>
           <Link to={game.name[0] ? `/boardgame/${game.name}`
                                  : `/boardgame/details`}
                 onClick={() => addBGDetails(game.id, favorites)}>
             <button className="details-button">
               view details
             </button>
          </Link>
        </div>
      )
    })

  } else if(path === "/recommendations") {
    recommendations.map((game, i) => {
      display.push(
        <div key={i} className="bg-card"
                     id={game.id}>
           <img className="bg-image"
                 src={game.image}/>
           <div className="overlay"></div>
           <FavButton favID={game.id}
                     list={recommendations}/>
           <Link to={game.name[0] ? `/boardgame/${game.name}`
                                  : `/boardgame/details`}
                 onClick={() => addBGDetails(game.id, recommendations)}>
             <button className="details-button">
               view details
             </button>
          </Link>
        </div>
      )



      // display.push(
      //   <div key={i} className="bg-card">
      //     <Link to={game.name[0] ? `/boardgame/${game.name}`
      //                            : `/boardgame/details`}
      //           onClick={() => addBGDetails(game.id, recommendations)}>
      //       <img className="bg-image"
      //            src={game.image}/>
      //     </Link>
      //     <FavButton favID={game.id}
      //                list={recommendations}/>
      //   </div>
      // )
    })

  } else {
    hotness.map((game, i) => {
      display.push(
        <div key={i} className="bg-card"
                     id={game.id}>
           <img className="bg-thumbnail"
                 src={game.thumbnail}/>
           <div className="overlay"></div>
           <FavButton favID={game.id}
                     list={hotness}/>
           <Link to={`/boardgame/${game.name}`}
                 onClick={() => addBGDetails(game.id, hotness)}>
             <button className="details-button">
               view details
             </button>
          </Link>
        </div>
      )
    })
  }

  const addBGDetails = (id, list) => {
    fetch(`/api/v1/bg-details/${id}`)
      .then(res => res.json())
      .then(details => {
        list.forEach(game => {
          if(game.id === id){
            Object.assign(game, details);
            props.getBGDetails(game);
          }
        })
      })
  }

  return (
    <section className="bg-card-container">
      {display}
    </section>
  )
}

export default BGDetailsContainer(AppContainer(FavoritesContainer(BoardgameCard)));
