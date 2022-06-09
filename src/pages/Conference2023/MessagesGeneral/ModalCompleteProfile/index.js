import React from "react";
import { connect } from "react-redux";
import { CircularProgressbar } from "components";
import { updateUser } from "redux/actions/home-actions";
import ProfileEditPanel from "containers/ProfileDrawer/ProfileEditPanel";

import "./style.scss";

const ModalCompleteProfile = ({
  updateUser,
  userProfile,
  get,
}) => {

    const onSave = (userInfo) => {
        updateUser(userInfo);
        get()
    };

    return (
        <div className="ModalContainer">
            <h1 className="title-complete-profile" >Hi! You must to complete your profile.</h1>
            <CircularProgressbar
                percent={userProfile ? userProfile.percentOfCompletion : 0}
                color="#fe5621"
                style={{width:"100%"}}
            />
            <div className="contenedor-profile-edit">
                <ProfileEditPanel
                    user={userProfile}
                    onSave={(userInfo) => {onSave(userInfo)}}
                />
            </div>
        </div>
    );
  };
  
  const mapStateToProps = (state, props) => ({
    
  });
  
  const mapDispatchToProps = {
    updateUser,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalCompleteProfile);