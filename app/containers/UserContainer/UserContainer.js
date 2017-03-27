import React from "react";
import {connect} from "react-redux";
import {getUser} from "../../actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => {
      dispatch(getUser(user))
    },
  }
};

export default connect(null, mapDispatchToProps);
