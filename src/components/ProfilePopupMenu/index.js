import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Popover } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { FilePdfOutlined, DeleteOutlined } from "@ant-design/icons";

import { CustomButton, CustomModal } from "components";
import { EVENT_TYPES, USER_ROLES } from "enum";
import Emitter from "services/emitter";

import { homeSelector } from "redux/selectors/homeSelector";
import { actions as authActions } from "redux/actions/auth-actions";

import "./style.scss";
import { getPortalSession, getSubscription } from "../../api/module/stripe";

// const ProfileMenus = [
//   {
//     label: "Read Later",
//     link: INTERNAL_LINKS.READ_LATER,
//   },
//   {
//     label: "Favorites",
//     link: INTERNAL_LINKS.FAVORITES,
//   },
// ];

const ProfileMenus = [];

class ProfilePopupMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      portalSession: null,
      subscription: null,
      showResumeModal: false,
    };
  }

  componentWillMount() {
    this.loadSubscription();
  }

  loadSubscription = async () => {
    if (this.state.subscription === null) {
      try {
        let response = await getSubscription();
        this.setState({
          subscription: response.data.subscription,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  createPortalSession = async () => {
    try {
      let response = await getPortalSession();
      this.setState(
        {
          portalSession: response.data.session,
        },
        () => {
          window.open(this.state.portalSession.url, "_blank");
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  onViewProfile = () => {
    Emitter.emit(EVENT_TYPES.EVENT_VIEW_PROFILE);
    this.setState({ visible: false });
  };

  onVisibleChange = (visible) => {
    this.setState({ visible });
  };

  onLogout = () => {
    this.props.logout();
  };

  onClaimCredits = () => {
    const { userProfile } = this.props;
    if (userProfile.memberShip === "premium") {
      window.open(process.env.REACT_APP_CLAIM_CREDITS_LINK, "_blank");
    } else {
      this.props.showPremiumAlert();
    }
    this.onVisibleChange(false);
  };

  onUpgrade = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  openResumeModal = (flag) => {
    this.setState({ showResumeModal: flag, visible: false });
  };

  onUploadResume = () => {};

  render() {
    const { className, children, ...rest } = this.props;
    const { visible, showResumeModal } = this.state;
    const { userProfile: user } = this.props;

    const TitleSection = () => (
      <div className="profile-popover-title" onClick={this.onViewProfile}>
        <div className="user-avatar">
          {user && user.img ? (
            <img src={user ? user.img : ""} alt="user-avatar" />
          ) : (
            (user || {}).abbrName
          )}
        </div>
        <div className="user-info">
          <p className="user-info-name">{`${user ? user.firstName || "" : ""} ${
            user ? user.lastName || "" : ""
          }`}</p>
          <p className="user-info-view">View / Update Profile</p>
        </div>
      </div>
    );

    const ContentSection = () => (
      <div className="profile-popover-content">
        <div className="profile-popover-content-menu">
          {user.memberShip === "premium" ? (
            <React.Fragment>
              <div>PREMIUM MEMBER</div>
              {this.state.subscription != null ? (
                <>
                  <div>
                    {moment
                      .unix(this.state.subscription.current_period_start)
                      .format("MMMM DD, yyyy")}{" "}
                    -{" "}
                    {moment
                      .unix(this.state.subscription.current_period_end)
                      .format("MMMM DD, yyyy")}
                  </div>
                  <div>
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        this.createPortalSession();
                      }}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Billing Information
                    </a>
                  </div>
                </>
              ) : null}
              {user.external_payment === 1 && (
                <>
                  <div>
                    {moment(user.subscription_startdate).format(
                      "MMMM DD, yyyy"
                    )}{" "}
                    -{" "}
                    {moment(user.subscription_enddate).format("MMMM DD, yyyy")}
                  </div>
                  {/* <div>
                    <a
                      href={this.state.portalSession.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Billing Information
                    </a>
                  </div> */}
                </>
              )}
            </React.Fragment>
          ) : (
            <div>Free Membership</div>
          )}
        </div>
        {user.role !== USER_ROLES.CHANNEL_ADMIN &&
          user.channelsSubscription === false && (
            <div
              className="profile-popover-content-menu"
              onClick={this.onUpgrade}
            >
              Become a CREATOR
            </div>
          )}
        {user.channelsSubscription === true && (
          <div className="profile-popover-content-menu">
            <div>CREATOR</div>
            <div>
              {moment(user.channelsSubscription_startdate).format(
                "MMMM DD, yyyy"
              )}{" "}
              -{" "}
              {moment(user.channelsSubscription_enddate).format(
                "MMMM DD, yyyy"
              )}
            </div>
          </div>
        )}
        <div
          className="profile-popover-content-menu"
          onClick={this.onClaimCredits}
        >
          Claim Conference Credits
        </div>
        {user.percentOfCompletion === 100 && (
          <div
            className="profile-popover-content-menu"
            onClick={() => this.openResumeModal(true)}
          >
            Upload your resume
          </div>
        )}
        {ProfileMenus.map((menu, index) => (
          <Link
            key={index}
            className="profile-popover-content-menu"
            to={menu.link}
            onClick={() => this.onVisibleChange(false)}
          >
            {menu.label}
          </Link>
        ))}
        <div className="profile-popover-content-footer">
          <CustomButton
            text="Log out"
            className="log-out"
            type="primary outlined"
            size="xs"
            onClick={this.onLogout}
          />
        </div>
        <CustomModal
          title="Upload your resume"
          centered
          visible={showResumeModal}
          width={500}
          onCancel={() => this.openResumeModal(false)}
        >
          <div className="upload-resume">
            <div className="upload-resume-form">
              <span className="upload-resume-form-label">Resume:</span>
              {user.resume ? (
                <>
                  <FilePdfOutlined className="upload-resume-form-pdficon" />
                  <DeleteOutlined className="upload-resume-form-delete" />
                </>
              ) : (
                <h5 className="upload-resume-none">-</h5>
              )}
            </div>
            <div className="upload-resume-footer">
              <CustomButton
                text="Upload"
                className="upload-resume-upload"
                type="primary outlined"
                size="xs"
                onClick={this.onUploadResume}
              />
            </div>
          </div>
        </CustomModal>
      </div>
    );

    return (
      <Popover
        {...rest}
        className={clsx("profile-popover", className)}
        placement="bottomRight"
        trigger="click"
        visible={visible}
        title={<TitleSection />}
        content={<ContentSection />}
        onVisibleChange={this.onVisibleChange}
      >
        {children}
      </Popover>
    );
  }
}

ProfilePopupMenu.propTypes = {
  title: PropTypes.string,
  logout: PropTypes.func,
  showPremiumAlert: PropTypes.func,
};

ProfilePopupMenu.defaultProps = {
  title: "",
  logout: () => {},
  showPremiumAlert: () => {},
};

const mapStateToProps = (state) => homeSelector(state);

const mapDispatchToProps = {
  logout: authActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePopupMenu);
