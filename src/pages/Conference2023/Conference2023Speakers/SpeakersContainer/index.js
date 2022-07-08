import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import { actions as speaker } from "redux/actions/speaker-actions";
import moment from "moment";
import { Avatar } from "antd";

import IconPlus from "images/icon-plus.svg";

import "./style.scss";

const ModalCompleteProfile = ({
    allUserSpeaker,
    getAllUserSpeaker,
    getAllPanelsOfOneUser,
    allPanelsOfOneUser,
    maxLength,
    type
}) => {

    const [windowPopUpForSpeaker, setWindowPopUpForSpeaker] = useState(false)
    const [speakerSelect, setSpeakerSelect] = useState({})

    useEffect(() => {
        getAllUserSpeaker()
    },[ getAllUserSpeaker ])

    const loadDataForPopUpSpeaker = (id) => {
        getAllPanelsOfOneUser(id, (error) => {
            if(!error){
                setWindowPopUpForSpeaker(true)
            }
        })
    }

    return (
        <>
            <div className="container-speakers">
                {allUserSpeaker?.userSpeakers?.map((user, index) => {
                
                if(maxLength !== undefined){
                    if(maxLength < index+1){
                        return (<></>)
                    }
                }

                let userImg;

                if(type === "speakers"){
                    if(user?.img){
                        userImg = (
                            <div className="container-img-people">
                                <img className="img-people" src={user.img} alt="img-people"/>
                            </div>
                        ) 
                    }else{
                        userImg = (
                            <div>
                                {user?.abbrName}
                            </div>
                        )
                    }
                }else{
                    if(user?.img){
                        userImg = (
                            <div className="container-avatar">
                                <Avatar src={user.img} style={{position: "absolute", background: "rgba(255, 255, 255, 0.15)", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} />
                            </div>
                        ) 
                     }else{
                         userImg = (
                            <div className="container-avatar">
                                <Avatar style={{fontSize:"40px", position: "absolute", background: "rgba(255, 255, 255, 0.15)",  width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}> 
                                    {user?.abbrName}
                                </Avatar>
                            </div>
                         )
                     }
                }

                return (
                    <div 
                        className="container-users" 
                        key={user?.id} 
                        onClick={() => {
                            loadDataForPopUpSpeaker(user?.id)
                            setSpeakerSelect({name: user?.firstName,lastName:user?.lastName, link: user?.personalLinks?.contact, biografia: user?.biografia})
                        }}
                    >
                        <div className="container-text">
                            <p className="p-users-speakers">Speaker</p>
                            <p className="p-users-name">{user?.firstName} {user?.lastName}</p>
                            <p className="p-users-profession">{user?.titleProfessions}</p>
                            <p className="p-users-biografi">with learning, community and collaboration. We are a community of business and HR leaders</p>
                        </div>
                        <div className="container-picture" style={(type === "speakers") ? {background: "#3e4960", overflow: "hidden"} : {background: "none", overflow: "visible"}}>
                            {userImg}
                        </div>
                    </div>
                )

                })}
            </div>
            {windowPopUpForSpeaker && 
                <div className="window-user">
                    <div className="card-popUp">
                        <div className="container-icon-close" >
                            <img className="icon-close" onClick={() => {setWindowPopUpForSpeaker(false)}} src={IconPlus} alt="icon-close" />
                        </div>
                        <h1 className="title-name">{speakerSelect?.name} {speakerSelect?.lastName}</h1>
                        <p>
                            <span className="bold-subtitle">Link: </span> 
                            {speakerSelect?.link}
                        </p>
                        <p>
                            <span className="bold-subtitle">Biography: </span> 
                            {(speakerSelect?.biografia !== undefined) ? speakerSelect?.biografia : "Sorry, this user don't have biography for the moment."}
                        </p>
                        <p><span className="bold-subtitle">Sessions: </span></p>
                        {allPanelsOfOneUser?.map((member) => (
                            <div className="container-sessions-speakers" key={member.SpeakerPanel.id}>
                                <h3>{member.SpeakerPanel.panelName}</h3>
                                <p>- {moment(member.SpeakerPanel.startDate).format("MM-DD-YYYY hh:mm a")}</p>
                                <p>- {moment(member.SpeakerPanel.endDate).format("MM-DD-YYYY hh:mm a")}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
  };
  
  const mapStateToProps = (state, props) => ({
    allUserSpeaker: speakerAllPanelSpeakerSelector(state).allUserSpeakers,
    allPanelsOfOneUser: speakerAllPanelSpeakerSelector(state).allPanelsOfOneUser
  });
  
  const mapDispatchToProps = {
    getAllUserSpeaker: speaker.getAllUserSpeaker,
    getAllPanelsOfOneUser: speaker.getAllPanelsOfOneUser
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalCompleteProfile);