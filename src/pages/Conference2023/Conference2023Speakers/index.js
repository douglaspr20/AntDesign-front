import React from "react";
import { connect } from "react-redux";
import SpeakersContainer from "./SpeakersContainer";
import { authSelector } from "redux/selectors/authSelector";

import "./style.scss";

const Conference2023Speakers = () => {

  return (
    <>
      <div className="container-conference">
        <div className="containers-speakers" id="speakers">
          <h1 className="title-containers">SPEAKERS</h1>  
          <SpeakersContainer/>
        </div>
      </div>
    </>
  );
  };
  
  const mapStateToProps = (state, props) => ({
    isAuthenticated: authSelector(state).isAuthenticated
  });
  
  const mapDispatchToProps = {

  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Conference2023Speakers);