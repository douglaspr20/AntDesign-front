import React from "react";
import { connect } from "react-redux";
import Agenda from "./Agenda";
import "./style.scss";

const Conference2023Agenda = () => {

  return (
    <>
      <div className="container-conference">
        <div className="containers-agenda" id="agenda">
          <p className="title-containers">Conference schedule</p>  
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