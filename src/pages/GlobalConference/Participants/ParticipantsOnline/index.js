import React, { useState } from "react";
import { ParticipantCard } from "components";
import { Pagination } from "antd";

const ParticipantsOnline = ({ participants }) => {
  const [page, setPage] = useState(1);

  const handlePaginated = (value) => {
    setPage(value);
  };

  return (
    <div className="participants">
      <h2>{participants.length} Participants Online</h2>
      {participants.length > 0 &&
        participants
          .slice((page - 1) * 20, page * 20)
          .map((participant, i) => (
            <ParticipantCard key={i} participant={participant} />
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

export default ParticipantsOnline;
