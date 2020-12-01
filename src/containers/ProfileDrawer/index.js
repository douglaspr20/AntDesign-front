import React from "react";
import PropTypes from "prop-types";

import { CustomDrawer } from "components";
import { EVENT_TYPES } from "enum";
import Emitter from "services/emitter";

import ProfileEditPanel from "./ProfileEditPanel";
import ProfileViewPanel from "./ProfileViewPanel";

class ProfileDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      edit: false,
    };
  }

  componentDidMount() {
    Emitter.on(EVENT_TYPES.EVENT_VIEW_PROFILE, () => {
      this.setState({ visible: true });
    });
  }

  onDrawerClose = () => {
    this.setState({ visible: false, edit: false });
  };

  onEdit = () => {
    this.setState({ edit: true });
  };

  onSave = () => {
    this.setState({ edit: false });
  };

  render() {
    const { visible, edit } = this.state;
    return (
      <CustomDrawer
        title={edit ? "Edit profile" : "Profile"}
        visible={visible}
        onClose={this.onDrawerClose}
      >
        {edit && (
          <ProfileEditPanel onSave={() => this.setState({ edit: true })} />
        )}
        {!edit && <ProfileViewPanel onEdit={this.onEdit} />}
      </CustomDrawer>
    );
  }
}

ProfileDrawer.propTypes = {
  title: PropTypes.string,
};

ProfileDrawer.defaultProps = {
  title: "",
};

export default ProfileDrawer;
