import React from "react";
import {connect} from "react-redux";
import {removeFavorite} from "../../actions";
import {addFavorite} from "../../actions"

const mapDispatchToProps = (dispatch) => {
  return {
    removeFavorite: (favorite) => {
      dispatch(removeFavorite(favorite))
    },
    addFavorite: (favorite) => {
      dispatch(addFavorite(favorite))
    }
  }
};

export default connect(null, mapDispatchToProps);
