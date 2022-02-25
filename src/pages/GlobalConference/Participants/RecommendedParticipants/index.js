import React, { useState } from "react";
import { connect } from "react-redux";
import { notification, Pagination, Skeleton } from "antd";
import { homeSelector } from "redux/selectors/homeSelector";
import { bonfireSelector } from "redux/selectors/bonfireSelector";
import { inviteUser } from "redux/actions/bonfire-actions";
import { createConversartion } from "redux/actions/conversation-actions";
import { CustomButton, ParticipantCard } from "components";
import Modal from "antd/lib/modal/Modal";
import { List } from "immutable";

const RecommendedParticipants = ({
  participants,
  getBonfires,
  bonfires,
  userProfile,
  inviteUser,
  createConversartion,
}) => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [participantToInvite, setParticipantToInvite] = useState(null);

  const handlePaginated = (value) => {
    setPage(value);
  };

  const handleCreateConversation = async (members) => {
    createConversartion(members);
  };
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
          message: "Participant has been invited",
        });
      }
    });
  };

  return (
    <div className="participants">
      <h2>{participants.length} Recommended Participants To Connect With</h2>
      <div className="speakers-list-container">
        {participants.length > 0 &&
          participants
            .slice((page - 1) * 20, page * 20)
            .map((participant, i) => (
              <ParticipantCard
                key={i}
                participant={participant}
                onOpenModalBonfires={onOpenModalBonfires}
                invitedAllBonfires={bonfires
                  .filter(
                    (bonfire) => bonfire.bonfireCreator === userProfile.id
                  )
                  .every(
                    (bonfire) =>
                      bonfire.invitedUsers.includes(participant.id) ||
                      bonfire.uninvitedJoinedUsers.includes(participant.id) ||
                      bonfire?.usersInvitedByOrganizer?.includes(participant.id)
                  )}
                handleCreateConversation={handleCreateConversation}
              />
            ))}
      </div>
      <Pagination
        defaultCurrent={page}
        defaultPageSize={20}
        total={participants.length}
        showSizeChanger={false}
        onChange={handlePaginated}
        style={{ marginTop: "1.5rem" }}
      />

      <Modal
        title="Bonfires creators for you"
        centered
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        width={800}
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
  userProfile: homeSelector(state).userProfile,
  bonfires: bonfireSelector(state).bonfires,
});

const mapDispatchToProps = {
  inviteUser,
  createConversartion,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendedParticipants);
