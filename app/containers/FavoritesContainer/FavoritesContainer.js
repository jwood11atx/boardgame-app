import React from "react";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (favorite) => {
      dispatch(addFavorite(favorite))
    }
  }
};

export default connect(null, mapDispatchToProps);
