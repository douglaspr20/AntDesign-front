import React from "react";
import { connect } from "react-redux";
import Agenda from "./Agenda";
import "./style.scss";

const Conference2023Agenda = () => {

  return (
    <>
      <div className="container-conference">
        <div className="imagen-agenda"></div>
        <div className="container-content-picture-agenda">
          <p className="title-containers">Conference schedule</p>  
        </div>
        <div className="containers-agenda" id="agenda">
          <Agenda/>
        </div>
      </div>
    </>
  );
  };
  
  const mapStateToProps = (state, props) => ({
  });
  
  const mapDispatchToProps = {
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Conference2023Agenda);