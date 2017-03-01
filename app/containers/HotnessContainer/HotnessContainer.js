import React from "react";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    hotness: state.hotness
  }
};

export default connect(mapStateToProps);
