import React from "react";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    searchIDs: state.searchIDs,
    searchResults: state.searchResults,
    displayed: state.displayed,
    hotness: state.hotness,
    favoritesIDs: state.favoritesIDs,
    favorites: state.favorites,
    recommendations: state.recommendations
  }
};

export default connect(mapStateToProps);
