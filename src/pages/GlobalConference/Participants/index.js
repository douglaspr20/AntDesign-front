import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { bonfireSelector } from "redux/selectors/bonfireSelector";
import { getBonfires, inviteUser } from "redux/actions/bonfire-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { getParticipants } from "redux/actions/session-actions";
import { CustomButton, ParticipantCard } from "components";
import { Modal, List, Skeleton, notification } from "antd";
import "./style.scss";

const Participants = ({
  participants,
  bonfires,
  userProfile,
  getParticipants,
  getBonfires,
  inviteUser,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [participantToInvite, setParticipantToInvite] = useState(null);
  useEffect(() => {
    if (userProfile.topicsOfInterest.length > 0) {
      getParticipants({
        topics: userProfile.topicsOfInterest,
        userId: userProfile.id,
      });

      getBonfires();
    }
  }, [getParticipants, getBonfires, userProfile]);

  const onOpenModalBonfires = (participantId) => {
    setOpenModal(true);
    setParticipantToInvite(participantId);
  };

  const onInviteUser = (bonfireId, participantId) => {
    inviteUser(bonfireId, participantId, (error) => {
      if (error) {
        notification.error({
          message: error || "Something went wrong. Please try again.",
        });
      } else {
        getBonfires();
        notification.success({
          message: "Bonfire updated succesfully",
        });
      }
    });
  };

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
              invitedAllBonfires={bonfires
                .filter((bonfire) => bonfire.bonfireCreator === userProfile.id)
                .every(
                  (bonfire) =>
                    bonfire.invitedUsers.includes(participant.id) ||
                    bonfire.uninvitedJoinedUsers.includes(participant.id) ||
                    bonfire?.usersInvitedByOrganizer?.includes(participant.id)
                )}
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
              bonfire.uninvitedJoinedUsers.includes(participantToInvite) ||
              bonfire?.usersInvitedByOrganizer?.includes(participantToInvite)
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
              <List.Item
                extra={
                  <CustomButton
                    size="sm"
                    text="Invite User"
                    onClick={() =>
                      onInviteUser(bonfire.id, participantToInvite)
                    }
                  />
                }
              >
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
  inviteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Participants);
