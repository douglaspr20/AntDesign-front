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
  onCancel,
  setBulKnowRegister
}) => {

    const onSave = (userInfo) => {
        setBulKnowRegister(true)
        updateUser(userInfo);
        get()
    };

    return (
        <div className="ModalContainer">
            <h1 className="title-complete-profile" >Hi! You must to complete your profile.</h1>
            <CircularProgressbar
                percent={userProfile ? userProfile.percentOfCompletion : 0}
                color="#fe5621"
                style={{width:"100%", marginBottom: "50px"}}
            />
            <div className="contenedor-profile-edit">
                <ProfileEditPanel
                    user={userProfile}
                    onSave={(userInfo) => {onSave(userInfo)}}
                    bulModal={true}
                    onCancel={() => onCancel(false)}
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