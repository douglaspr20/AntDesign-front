import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./style.scss";

const Conference2023Home = () => {

  return (
    <>
      <div className="container-conference">
        <div className="imagen-conference"></div>
        <div className="containers-home" id="home">
          <h1 className="title-containers">Title home</h1>
        </div>
      </div>
    </>
  );
  };

  Conference2023Home.propTypes = {
    title: PropTypes.string,
  };
  
  Conference2023Home.defaultProps = {
    title: "",
  };
  
  const mapStateToProps = (state, props) => ({
  });
  
  const mapDispatchToProps = {
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Conference2023Home);