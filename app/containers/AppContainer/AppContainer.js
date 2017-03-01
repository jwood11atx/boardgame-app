import React from "react";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    searchIDs: state.searchIDs,
    searchResults: state.searchResults,
    displayed: state.displayed,
    hotness: state.hotness,
    favorites: state.favorites
  }
};

export default connect(mapStateToProps);
