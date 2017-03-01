import React from "react";
import {connect} from "react-redux";
import {getHotness, getSearchResults, getSearchIDs, clearSearchResults, clearSearchIDs} from "../../actions";

const mapDispatchToProps = (dispatch) => {
    return {
      getHotness: (hotness) => {
        dispatch(getHotness(hotness))
      },
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
      }
    }
}

export default connect(null, mapDispatchToProps);
