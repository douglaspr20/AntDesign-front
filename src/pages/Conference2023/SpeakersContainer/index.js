import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import { actions as speaker } from "redux/actions/speaker-actions";
import { Avatar } from "antd";
import moment from "moment";

import IconPlus from "images/icon-plus.svg";

import "./style.scss";

const ModalCompleteProfile = ({
    allUserSpeaker,
    getAllUserSpeaker,
    isAuthenticated,
    getAllPanelsOfOneUser,
    allPanelsOfOneUser
}) => {

    const [windowPopUpForSpeaker, setWindowPopUpForSpeaker] = useState(false)
    const [speakerSelect, setSpeakerSelect] = useState({})

    useEffect(() => {
        getAllUserSpeaker()
    },[ getAllUserSpeaker,isAuthenticated ])

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
                {allUserSpeaker?.userSpeakers?.map((user) => (
                    <div 
                        className="container-users" 
                        key={user?.id} 
                        onClick={() => {
                            loadDataForPopUpSpeaker(user?.id)
                            setSpeakerSelect({name: user?.firstName,lastName:user?.lastName, link: user?.personalLinks?.contact, biografia: user?.biografia})
                        }}
                    >
                        {user?.img ? (
                            <Avatar size={200} src={user?.img} />
                            ) : (
                            <Avatar size={200} style={{ fontSize: "2rem" }}>
                                {user?.abbrName}
                            </Avatar>
                        )}
                        <p className="p-users">{user?.firstName} {user?.lastName}</p>
                        <p className="p-users" style={{color:"black", fontSize: "12px", fontWeight: "bold"}}>{user?.titleProfessions}</p>
                    </div>
                ))}
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