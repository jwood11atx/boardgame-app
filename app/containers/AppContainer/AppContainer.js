import React from "react";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    searchIDs: state.searchIDs,
    searchResults: state.searchResults,
    displayed: state.displayed,
    hotness: state.hotness,
    favoritesIDs: state.favoriteIDs,
    favorites: state.favorites
  }
};

export default connect(mapStateToProps);
