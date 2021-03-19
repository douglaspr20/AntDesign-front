import React from "react";

import { CustomDrawer } from "components";

import LibraryForm from "./LibraryForm";

const LibraryAddDrawer = ({ visible, type, onAdded, onClose }) => {
  return (
    <CustomDrawer
      title={type === "article" ? "Add Resources" : "Add Videos"}
      visible={visible}
      onClose={onClose}
    >
      <LibraryForm type={type} onAdded={onAdded} onCancel={onClose} />
    </CustomDrawer>
  );
};

export default LibraryAddDrawer;
