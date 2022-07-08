import React from "react";
import { connect } from "react-redux";
import SpeakersContainer from "./SpeakersContainer";
import { authSelector } from "redux/selectors/authSelector";

import "./style.scss";

const Conference2023Speakers = () => {

  return (
    <>
      <div className="container-conference" style={{ marginTop: "90px"}}>
        <div className="contenedor-title-speakers">
          <p className="title-containers">{"Special Guests & Speakers"}</p> 
        </div>
        <div className="containers-speakers" id="speakers"> 
          <SpeakersContainer type={"speakers"}/>
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