import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import { CustomButton } from "components";

import "./style.scss";

const MemberSpeakers = ({
    usersPanel,
    isAdmin,
    remove
}) => {

    const { id, isModerator, UserId} = usersPanel
    const { firstName, img, titleProfessions, lastName, abbrName} = usersPanel.User

    return (
      <>
        <div className="container-users" key={id} id={UserId}>
          {img ? (
            <Avatar size={150} src={img} />
          ) : (
            <Avatar size={150} style={{ fontSize: "2rem" }}>
              {abbrName}
            </Avatar>
          )}
          <p className="p-users">{firstName} {lastName}</p>
          <p className="p-users" style={{color:"black", fontSize: "12px", fontWeight: "bold"}}>{titleProfessions}{isModerator ? " / Moderator" : ""}</p>
          {isAdmin &&
            <CustomButton
              className="button-speaker"
              text="Remove"
              size="md"
              type="third"
              onClick={() => {remove(id)}}
            />}
        </div>
      </>
    );
  };
  
  const mapStateToProps = (state, props) => ({

  });
  
  const mapDispatchToProps = {

  };

  MemberSpeakers.propTypes = {
    usersPanel: PropTypes.object,
    isAdmin: PropTypes.bool,
    remove: PropTypes.func,
  };
  
  MemberSpeakers.defaultProps = {
    usersPanel: {},
    isAdmin: false,
    remove: () => {},
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MemberSpeakers);
  