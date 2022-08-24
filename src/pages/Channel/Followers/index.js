import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Avatar } from "antd";

import "./style.scss";

const MemberSpeakers = ({
    followers,
    index
}) => {

    const { firstName, img, titleProfessions, lastName, abbrName} = followers

    return (
      <>
        <div className="container-users" key={index} style={{width: "300px"}}>
          <div className="container-data-member">
            {img ? (
              <Avatar size={55} src={img} />
            ) : (
              <Avatar size={55} style={{ fontSize: "1rem" }}>
                {abbrName}
              </Avatar>
            )}
            <div className="container-p">
              <p className="p-title-conference">{firstName} {lastName}</p>
              <p className="p-profession-conference">{titleProfessions}</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  const mapStateToProps = (state, props) => ({

  });
  
  const mapDispatchToProps = {

  };

  MemberSpeakers.propTypes = {
    followers: PropTypes.object,
    index: PropTypes.number
  };
  
  MemberSpeakers.defaultProps = {
    followers: {},
    index: 0,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MemberSpeakers);