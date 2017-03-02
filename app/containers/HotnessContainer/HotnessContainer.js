import React from "react";
import {connect} from "react-redux";
import {getHotness} from "../../actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getHotness: (hotness) => {
      dispatch(getHotness(hotness))
    },
  }
};

export default connect(null, mapDispatchToProps);
