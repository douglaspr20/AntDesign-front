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
      user: {
        firstName: "Edgar",
        lastName: "Davis",
        abbrName: "ED",
        img: null,
        about: `Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.`,
        titleProfessions: "HR Management & Coaching",
        proficiencyLevel: "",
        topicsOfInterest: [],
        personalLinks: {},
        language: "",
        timezone: "",
        completed: false,
        percentOfCompletion: 75,
      },
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

  onSave = (userInfo) => {
    this.setState({ edit: false, user: userInfo });
  };

  render() {
    const { visible, edit, user } = this.state;
    return (
      <CustomDrawer
        title={edit ? "Edit profile" : "Profile"}
        visible={visible}
        onClose={this.onDrawerClose}
      >
        {edit && (
          <ProfileEditPanel
            user={user}
            onSave={this.onSave}
            onCancel={() => this.setState({ edit: false })}
          />
        )}
        {!edit && <ProfileViewPanel user={user} onEdit={this.onEdit} />}
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
