import React from "react";

import { CustomDrawer } from "components";

import PodcastForm from "./PodcastForm";

const PodcastDrawer = ({ visible, onAdded, onClose }) => {
  return (
    <CustomDrawer title="Add Podcasts" visible={visible} onClose={onClose}>
      <PodcastForm onAdded={onAdded} onCancel={onClose} />
    </CustomDrawer>
  );
};

export default PodcastDrawer;
