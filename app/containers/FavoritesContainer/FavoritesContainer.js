import React from "react";
import {connect} from "react-redux";
import {addFavoriteIDs} from "../../actions";
import {addFavorite} from "../../actions"

const mapDispatchToProps = (dispatch) => {
  return {
    addFavoriteIDs: (favoriteIDs) => {
      dispatch(addFavoriteIDs(favoriteIDs))
    },
    addFavorite: (favorite) => {
      dispatch(addFavorite(favorite))
    }
  }
};

export default connect(null, mapDispatchToProps);
