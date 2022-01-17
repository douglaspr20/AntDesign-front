import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Popover, Form, Input } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { isValidPassword } from "utils/format";

import { CustomButton, CustomModal, CustomInput } from "components";
import { EVENT_TYPES, USER_ROLES, INTERNAL_LINKS } from "enum";
import Emitter from "services/emitter";

import { homeSelector } from "redux/selectors/homeSelector";
import { actions as authActions } from "redux/actions/auth-actions";
import { actions as homeActions } from "redux/actions/home-actions";
import UploadResumeModal from "../UploadResumeModal";

import "./style.scss";
import { getPortalSession, getSubscription } from "../../api/module/stripe";
import Modal from "antd/lib/modal/Modal";

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

const confirmPasswordRules = [
  {
    required: true,
    message: "Please confirm your password!",
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("newPassword") === value) {
        return Promise.resolve();
      }

      return Promise.reject(new Error("The passwords do not match."));
    },
  }),
];

const ProfilePopupMenu = (props) => {
  const {
    className,
    children,
    logout,
    userProfile: user,
    changePassword,
    userProfile,
    acceptApply,
    ...rest
  } = props;

  const [visible, setVisible] = useState(false);
  const [portalSession, setPortalSession] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [visibleConfirmApply, setVisibleConfirmApply] = useState(false);
  const [showPremiumFirewall, setShowPremiumFirewall] = useState(false);
  const [showProfileCompletionFirewall, setShowProfileCompletionFirewall] =
    useState(false);

  const history = useHistory();

  const [form] = Form.useForm();
  let applyState;
  useEffect(() => {
    async function loadSubscription() {
      if (!subscription) {
        try {
          let response = await getSubscription();
          setSubscription(response.data.subscription);
        } catch (error) {
          console.log(error);
        }
      }
    }

    loadSubscription();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (portalSession) {
      window.open(portalSession.url, "_blank");
    }
  }, [portalSession]);

  const createPortalSession = async () => {
    try {
      let response = await getPortalSession();

      setPortalSession(response.data.session);
    } catch (err) {
      console.log(err);
    }
  };

  const onViewProfile = () => {
    Emitter.emit(EVENT_TYPES.EVENT_VIEW_PROFILE);
    setVisible(false);
  };

  const onVisibleChange = (visible) => {
    setVisible(visible);
  };

  const onLogout = () => {
    logout();
  };

  const onUpgrade = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
    setVisible(false);
  };

  const openResumeModal = (flag) => {
    setShowResumeModal(flag);
    setVisible(false);
  };

  const openChangePasswordModal = (flag) => {
    setVisible(false);
    setShowChangePasswordModal(flag);
  };

  const handleOnFinish = (values) => {
    changePassword(userProfile.id, values.oldPassword, values.newPassword);
  };

  const onApplyBusinessPartner = () => {
    if (user.percentOfCompletion === 100 && !user.isBusinessPartner) {
      setVisibleConfirmApply(true);
    } else {
      setShowProfileCompletionFirewall(true);
    }
    if (user.memberShip !== "premium") {
      setShowPremiumFirewall(true);
    }
    if (user.isBusinessPartner && user.memberShip === "premium") {
      history.push(INTERNAL_LINKS.BUSINESS_PARTNER);
    }
  };

  const completeProfile = () => {
    Emitter.emit(EVENT_TYPES.EVENT_VIEW_PROFILE);
  };

  const handleChange = (value) => {
    applyState = value;
  };

  const onApplyBusness = () => {
    acceptApply({ userId: userProfile.id, applyState });
  };

  const TitleSection = () => (
    <div className="profile-popover-title" onClick={onViewProfile}>
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
      {(user.memberShip === "premium" ||
        user.channelsSubscription === true ||
        user.recruiterSubscription === true) && (
        <div className="profile-popover-content-menu">
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              createPortalSession();
            }}
            rel="noopener noreferrer"
            target="_blank"
          >
            Billing Information
          </a>
        </div>
      )}
      <div className="profile-popover-content-menu">
        {user.memberShip === "premium" ? (
          <React.Fragment>
            <div>PREMIUM MEMBER</div>
            {subscription ? (
              <>
                <div>
                  {moment
                    .unix(subscription?.current_period_start)
                    .format("MMMM DD, yyyy")}{" "}
                  -{" "}
                  {moment
                    .unix(subscription?.current_period_end)
                    .format("MMMM DD, yyyy")}
                </div>
              </>
            ) : null}
            {user.external_payment === 1 && (
              <>
                <div>
                  {moment(user.subscription_startdate).format("MMMM DD, yyyy")}{" "}
                  - {moment(user.subscription_enddate).format("MMMM DD, yyyy")}
                </div>
                {/* <div>
                  <a
                    href={portalSession.url}
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
          <div className="profile-popover-content-menu" onClick={onUpgrade}>
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
            {moment(user.channelsSubscription_enddate).format("MMMM DD, yyyy")}
          </div>
        </div>
      )}
      {user.recruiterSubscription !== true && (
        <div className="profile-popover-content-menu" onClick={onUpgrade}>
          Become a RECRUITER
        </div>
      )}
      {user.recruiterSubscription === true && (
        <div className="profile-popover-content-menu">
          <div>RECRUITER</div>
          <div>
            {moment(user.recruiterSubscription_startdate).format(
              "MMMM DD, yyyy"
            )}{" "}
            -{" "}
            {moment(user.recruiterSubscription_enddate).format("MMMM DD, yyyy")}
          </div>
        </div>
      )}
      {user.isSponsor && (
        <div
          className="profile-popover-content-menu"
          onClick={() => history.push(INTERNAL_LINKS.SPONSOR_DASHBOARD)}
        >
          Partners Dashboard
        </div>
      )}
      <div
        className="profile-popover-content-menu"
        onClick={() => history.push(INTERNAL_LINKS.MY_LEARNINGS)}
      >
        My Learning
      </div>
      {user.percentOfCompletion === 100 && (
        <div
          className="profile-popover-content-menu"
          onClick={() => openChangePasswordModal(true)}
        >
          Change Password
        </div>
      )}
      {user.councilMember && (
        <div
          className="profile-popover-content-menu"
          onClick={() => history.push(INTERNAL_LINKS.COUNCIL)}
        >
          Experts Council
        </div>
      )}
      <div className="profile-popover-content-menu">
        <React.Fragment>
          <div onClick={onApplyBusinessPartner}>
            {user.isBusinessPartner
              ? "HR Business Partners Community"
              : "Application to the HR Business Partner Community"}
          </div>
        </React.Fragment>
        {user.percentOfCompletion === 100 ? (
          <Modal
            visible={visibleConfirmApply}
            title="Are you sure you want to apply to the HR business partner community?"
            width={500}
            onCancel={() => setVisibleConfirmApply(false)}
            onOk={() => {
              onApplyBusness();
              setVisibleConfirmApply(false);
            }}
            okText="Confirm"
          >
            <p>
              Your application will be sent to Hacking HR when you click on
              confirm. Before confirming, please make sure your profile reflects
              your current title, company and other relevant information. We use
              the information in your profile to determine your participation in
              the Hacking HR's HR Business Partner Community. You will be
              notified within the next 48 hours.
            </p>
            <h5 className="business-partner-title">If you don't have the "HR Business Partner:</h5>
            <p>
              Please let us know here if you don't have the "official" title of
              HR Business Partner but still perform the high-level, strategic
              functions of an HR Business Partners. We will consider your
              application as well:
            </p>
            <Input.TextArea
              {...rest}
              rows={4}
              // className={clsx("custom-input", className, "mutiple", size)}
              onChange={(e) => handleChange(e.target.value)}
            />
          </Modal>
        ) : (
          <>
            {showProfileCompletionFirewall && (
              <div
                className="skill-cohort-firewall"
                onClick={() => setShowProfileCompletionFirewall(false)}
              >
                <div
                  className="upgrade-notification-panel"
                  onClick={completeProfile}
                >
                  <h3>
                    You must fully complete your profile before aplly to the HR
                    business partner community.
                  </h3>
                </div>
              </div>
            )}
          </>
        )}
        <>
          {showPremiumFirewall && (
            <div
              className="skill-cohort-firewall"
              onClick={() => setShowPremiumFirewall(false)}
            >
              <div className="upgrade-notification-panel">
                <h3>
                  You must be a premium member to see the business member
                  community page.
                </h3>
              </div>
            </div>
          )}
        </>
      </div>
      {/* {user.percentOfCompletion === 100 && (
        <div
          className="profile-popover-content-menu"
          onClick={() => openResumeModal(true)}
        >
          Upload your resume
        </div>
      )} */}
      {ProfileMenus.map((menu, index) => (
        <Link
          key={index}
          className="profile-popover-content-menu"
          to={menu.link}
          onClick={() => onVisibleChange(false)}
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
          onClick={onLogout}
        />
      </div>
      <UploadResumeModal
        visible={showResumeModal}
        onClose={() => openResumeModal(false)}
      />
      <CustomModal
        visible={showChangePasswordModal}
        title="Change Password"
        onCancel={() => openChangePasswordModal(false)}
        width={617}
      >
        <Form form={form} onFinish={handleOnFinish} layout="vertical">
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[{ required: true, message: "This field is required." }]}
          >
            <CustomInput type="password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            required={true}
            rules={[
              () => ({
                validator(rule, value) {
                  switch (isValidPassword(value)) {
                    case 0:
                      return Promise.resolve();
                    case 1:
                      return Promise.reject(
                        "Password length should be 8 or more!"
                      );
                    case 2:
                      return Promise.reject("Password should contain number!");
                    case 3:
                      return Promise.reject("Password should contain symbol!");
                    case 4:
                      return Promise.reject(
                        "Password should contain capital letter!"
                      );
                    case 5:
                      return Promise.reject("Please enter your password!");
                    default:
                      return Promise.reject("Something went wrong!");
                  }
                },
              }),
            ]}
          >
            <CustomInput type="password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={confirmPasswordRules}
          >
            <CustomInput type="password" />
          </Form.Item>
          <Form.Item>
            <CustomButton text="Submit" type="primary" htmlType="submit" />
          </Form.Item>
        </Form>
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
      onVisibleChange={onVisibleChange}
    >
      {children}
    </Popover>
  );
};

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
  acceptApply: homeActions.acceptInvitationApply,
  ...homeActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePopupMenu);
