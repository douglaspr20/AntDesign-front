import React, { useState } from "react";
import { connect } from "react-redux";
import { ParticipantCard } from "components";
import { Pagination } from "antd";
import { createConversartion } from "redux/actions/conversation-actions";

const ParticipantsOnline = ({ participants, createConversartion }) => {
  const [page, setPage] = useState(1);

  const handlePaginated = (value) => {
    setPage(value);
  };

  const handleCreateConversation = (members) => {
    createConversartion(members);
  };

  return (
    <div className="participants">
      <h2>{participants.length} Participants Online</h2>
      {participants.length > 0 &&
        participants
          .slice((page - 1) * 20, page * 20)
          .map((participant, i) => (
            <ParticipantCard
              key={i}
              participant={participant}
              handleCreateConversation={handleCreateConversation}
            />
          ))}

      <Pagination
        defaultCurrent={page}
        defaultPageSize={20}
        total={participants.length}
        showSizeChanger={false}
        onChange={handlePaginated}
        style={{ marginTop: "1.5rem" }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  createConversartion,
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsOnline);
