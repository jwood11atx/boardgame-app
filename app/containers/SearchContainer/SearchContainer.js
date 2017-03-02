import React from "react";
import {connect} from "react-redux";
import {getSearchResults,
        getSearchIDs,
        clearSearchResults,
        clearSearchIDs,
        incDisplayed,
        resetDisplayed} from "../../actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchResults: (games) => {
      dispatch(getSearchResults(games))
    },
    getSearchIDs: (ids) => {
      dispatch(getSearchIDs(ids))
    },
    clearSearchResults: () => {
      dispatch(clearSearchResults())
    },
    clearSearchIDs: () => {
      dispatch(clearSearchIDs())
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
