import React from "react";
import {connect} from "react-redux";
import {getSearchResults,
        clearSearchResults,
        incDisplayed,
        resetDisplayed} from "../../actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchResults: (games) => {
      dispatch(getSearchResults(games))
    },
    clearSearchResults: () => {
      dispatch(clearSearchResults())
    },
    incDisplayed: () => {
      dispatch(incDisplayed())
    },
    resetDisplayed: () => {
      dispatch(resetDisplayed())
    }
  }
}

export default connect(null, mapDispatchToProps);
