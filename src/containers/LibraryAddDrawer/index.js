import React, { useState, useEffect } from "react";

import { CustomDrawer } from "components";
import { EVENT_TYPES } from "enum";
import Emitter from "services/emitter";

import LibraryForm from "./LibraryForm";

const LibraryAddDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");

  const onDrawerClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    Emitter.on(EVENT_TYPES.OPEN_ADD_LIBRARY_FORM, (type) => {
      setVisible(true);
      setType(type);
    });
  }, []);

  return (
    <CustomDrawer
      title={type === "resource" ? "Add Resources" : "Add Videos"}
      visible={visible}
      onClose={onDrawerClose}
    >
      <LibraryForm type={type} onCancel={onDrawerClose} />
    </CustomDrawer>
  );
};

export default LibraryAddDrawer;
