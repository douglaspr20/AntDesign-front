import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import { actions as speaker } from "redux/actions/speaker-actions";
import {CustomButton} from "components";
import moment from "moment";

import "./style.scss";

const ModalCompleteProfile = ({
    allPanelSpeakers,
    getAllPanelSpeakers,
}) => {

    const [tabButton, setTabButton] = useState(true)

    useEffect(() => {
        getAllPanelSpeakers()
    }, [getAllPanelSpeakers])

    return (
        <div className="container-agenda">
            <div className="space-around">
                <CustomButton
                        className="button-speaker"
                        text={`Panels`}
                        size="xl"
                        type="primary"
                        onClick={() => setTabButton(true)}
                    /> 
                <CustomButton
                    className="button-speaker"
                    text={`Simulations`}
                    size="xl"
                    type="primary"
                    onClick={() => setTabButton(false)}
                /> 
            </div>
            {tabButton ? 
                <div className="container-agenda-panels">
                    {allPanelSpeakers?.panelsSpeakers?.map((panels) => (
                        <div className="container-sessions-speakers" key={panels.id}>
                            <h3>{panels.panelName}</h3>
                            <p>- {moment(panels.startDate).format("MM-DD-YYYY hh:mm a")}</p>
                            <p>- {moment(panels.endDate).format("MM-DD-YYYY hh:mm a")}</p>
                        </div>
                    ))}
                </div>
            :
                <div className="container-agenda-simulations">Simulations is here</div>
            }
        </div>
    );
  };
  
  const mapStateToProps = (state, props) => ({
    allPanelSpeakers: speakerAllPanelSpeakerSelector(state).allPanelSpeakers,
  });
  
  const mapDispatchToProps = {
    getAllPanelSpeakers: speaker.getAllPanelSpeakers,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalCompleteProfile);