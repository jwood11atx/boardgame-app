import React from "react";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    bgDetails: state.bgDetails,
    displayed: state.displayed,
    favorites: state.favorites,
    hotness: state.hotness,
    recommendations: state.recommendations,
    searchIDs: state.searchIDs,
    searchResults: state.searchResults
  }
};

export default connect(mapStateToProps);
