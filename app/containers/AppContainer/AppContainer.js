import React from "react";
import {connect} from "react-redux";
import {getHotness, getSearchResults, getSearchIDs} from "../../actions";

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
      }
    }
}

export default connect(null, mapDispatchToProps);
