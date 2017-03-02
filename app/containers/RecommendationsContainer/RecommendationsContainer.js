import React from "react";
import {connect} from "react-redux";
import {getRecommendations} from "../../actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getRecommendations: (recommendations) => {
      dispatch(getRecommendations(recommendations))
    },
  }
};

export default connect(null, mapDispatchToProps);
