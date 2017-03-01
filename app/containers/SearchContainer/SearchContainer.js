import React from "react";
import {connect} from "react-redux";
import {getSearchResults} from "../../actions";

const mapStateToProps = (state) => {
  return {
    searchIDs: state.searchIDs,
    searchResults: state.searchResults
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchResults: (games) => {
      dispatch(getSearchResults(games))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps);
