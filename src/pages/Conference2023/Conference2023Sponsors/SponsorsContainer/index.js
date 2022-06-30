import React, {useEffect} from "react";
import { connect } from "react-redux";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import { actions as speaker } from "redux/actions/speaker-actions";
import { Avatar } from "antd";

import "./style.scss";

const Sponsors = ({
    allSponsors,
    getAllSponsors,
}) => {

    useEffect(() => {
        getAllSponsors()
    },[ getAllSponsors ])

    return (
        <>
            <div className="container-sponsor">
                {allSponsors?.map((sponsor) => (
                    <div 
                        className="container-users" 
                        key={sponsor?.id} 
                    >
                        <a href={(sponsor?.link.substring(0,7) !== "http://" || sponsor?.link.substring(0,8) !== "https://") ? `https://${sponsor?.link}` : sponsor?.link} target="_blank" rel="noopener noreferrer">
                            <Avatar size={200} src={sponsor?.logo} />
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
  };
  
  const mapStateToProps = (state, props) => ({
    allSponsors: speakerAllPanelSpeakerSelector(state).allSponsors
  });
  
  const mapDispatchToProps = {
    getAllSponsors: speaker.getAllSponsors
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sponsors);