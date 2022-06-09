import React from "react";
import { connect } from "react-redux";

import "./style.scss";

const Conference2023Sponsors = () => {

  return (
    <>
      <div className="container-conference">
        <div className="containers-sponsors" id="sponsors">
          <h1 className="title-containers">Title sponsors</h1>  
        </div>
      </div>
    </>
  );
  };
  
  const mapStateToProps = (state, props) => ({
  });
  
  const mapDispatchToProps = {
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Conference2023Sponsors);