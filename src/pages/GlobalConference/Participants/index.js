import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { bonfireSelector } from "redux/selectors/bonfireSelector";
import { getBonfires } from "redux/actions/bonfire-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { getParticipants } from "redux/actions/session-actions";
import { CustomButton, ParticipantCard } from "components";
import { Modal, List, Skeleton } from "antd";
import "./style.scss";

const Participants = ({
  participants,
  bonfires,
  userProfile,
  getParticipants,
  getBonfires,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [participantToInvite, setParticipantToInvite] = useState(null);
  useEffect(() => {
    if (userProfile.topicsOfInterest.length > 0) {
      getParticipants({
        topics: userProfile.topicsOfInterest,
      });

      getBonfires();
    }
  }, [getParticipants, getBonfires, userProfile]);

  const onOpenModalBonfires = (participantId) => {
    setOpenModal(true);
    setParticipantToInvite(participantId);
  };

  console.log(bonfires);

  return (
    <div className="participants">
      <div className="participants-container">
        <h2>{participants.length} Recommended Participants To Connect With</h2>
        <div className="participants-list">
          {participants.map((participant, i) => (
            <ParticipantCard
              key={i}
              participant={participant}
              onOpenModalBonfires={onOpenModalBonfires}
            />
          ))}
        </div>
      </div>
      <Modal
        title="Bonfires creators for you"
        centered
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        width={1000}
      >
        <List
          itemLayout="horizontal"
          dataSource={bonfires.filter(
            (bonfire) => bonfire.bonfireCreator === userProfile.id
          )}
          renderItem={(bonfire) => {
            if (
              bonfire.invitedUsers.includes(participantToInvite) ||
              bonfire.uninvitedJoinedUsers.includes(participantToInvite)
            ) {
              return (
                <List.Item
                  actions={[
                    <CustomButton
                      size="sm"
                      text="User Already Invited or Joined"
                      disabled={true}
                    />,
                  ]}
                >
                  <Skeleton title={false} loading={false}>
                    <List.Item.Meta
                      title={bonfire.title}
                      description={bonfire.description}
                    />
                  </Skeleton>
                </List.Item>
              );
            }

            return (
              <List.Item extra={<CustomButton size="sm" text="Invite User" />}>
                <Skeleton title={false} loading={false}>
                  <List.Item.Meta
                    title={bonfire.title}
                    description={bonfire.description}
                  />
                </Skeleton>
              </List.Item>
            );
          }}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...sessionSelector(state),
  userProfile: homeSelector(state).userProfile,
  bonfires: bonfireSelector(state).bonfires,
});

const mapDispatchToProps = {
  getParticipants,
  getBonfires,
};

export default connect(mapStateToProps, mapDispatchToProps)(Participants);
