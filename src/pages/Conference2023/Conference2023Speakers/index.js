import React from "react";
import { connect } from "react-redux";
import SpeakersContainer from "./SpeakersContainer";
import { authSelector } from "redux/selectors/authSelector";

import "./style.scss";

const Conference2023Speakers = () => {

  return (
    <>
      <div className="container-conference" style={{ marginTop: "90px"}}>
        <div className="imagen-speakers">
        </div>
        <div className="container-content-picture-speakers">
          <p className="title-containers">Speakers</p> 
        </div>
        <div className="containers-speakers" id="speakers"> 
          <SpeakersContainer className={"container-users"} />
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