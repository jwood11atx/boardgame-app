import React from "react";
import {connect} from "react-redux";
import {getBGDetails} from "../../actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getBGDetails: (bgDetails) => {
      dispatch(getBGDetails(bgDetails))
    },
  }
};

export default connect(null, mapDispatchToProps);
