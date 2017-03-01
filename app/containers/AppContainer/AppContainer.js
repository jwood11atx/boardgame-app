

import React from "react";
import {connect} from "react-redux";
import {getHotness} from "../../actions";

const mapStateToProps = (state) => {
  return {
    hotness: state.hotness
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getHotness: (hotness) => {
        dispatch(getHotness(hotness))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps);
