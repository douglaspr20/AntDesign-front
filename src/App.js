import React, { Component } from "react";
import { connect } from "react-redux";

import { Spin, Layout } from "antd";
import isEmpty from "lodash/isEmpty";

import Content from "containers/Content";
import TopHeader from "containers/TopHeader";
import Sider from "containers/Sider";
import ProfileDrawer from "containers/ProfileDrawer";
import LibraryShareDrawer from "containers/LibraryShareDrawer";
import Emitter from "services/emitter";
import SocketIO from "services/socket";

import PaymentModal from "./containers/PaymentModal";
import PaymentForm from "./containers/PaymentForm";
import InviteFriendModal from "./containers/InviteFriendModal";
import InviteFriendForm from "./containers/InviteFriendForm";
import PostFormModal from "./containers/PostFormModal";
import PostForm from "./containers/PostForm";
import FeedbackBox from "./containers/FeedbackBox";
import AttendanceDisclaimerModal from "./containers/AttendanceDisclaimerModal";

import { HelmetMetaData } from "components";

import { EVENT_TYPES, SOCKET_EVENT_TYPE } from "enum";

import IconLoading from "images/icon-loading.gif";

import { actions as envActions } from "redux/actions/env-actions";
import { setJoinCouncilEvent } from "redux/actions/council-events-actions";
import { upgradePlan, inviteFriend } from "redux/actions/home-actions";
import { getCategories } from "redux/actions/category-actions";
import { getCategories as getChannelCategories } from "redux/actions/channel-category-actions";
import { getLive } from "redux/actions/live-actions";

import { pushNotification } from "redux/actions/notification-actions";
import { envSelector } from "redux/selectors/envSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { authSelector } from "redux/selectors/authSelector";

import "./styles/main.scss";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.props.setDimensions(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 576) this.props.setIsMobile(true);
    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      openPaymentModal: false,
      openPaymentPanel: false,
      openInviteFriendModal: false,
      openInviteFriendPanel: false,
      openPostFormModal: false,
      openPostFormPanel: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    Emitter.on(EVENT_TYPES.OPEN_PAYMENT_MODAL, () => {
      if (this.props.isMobile) {
        this.setState({ openPaymentPanel: true });
      } else {
        this.setState({ openPaymentModal: true });
      }
    });

    Emitter.on(EVENT_TYPES.OPEN_INVITE_FRIEND_MODAL, () => {
      if (this.props.isMobile) {
        this.setState({ openInviteFriendPanel: true });
      } else {
        this.setState({ openInviteFriendModal: true });
      }
    });

    Emitter.on(EVENT_TYPES.OPEN_POST_MODAL, () => {
      if (this.props.isMobile) {
        this.setState({ openPostFormPanel: true });
      } else {
        this.setState({ openPostFormModal: true });
      }
    });

    Emitter.on(EVENT_TYPES.CLOSE_POST_MODAL, () => {
      if (this.props.isMobile) {
        this.setState({ openPostFormPanel: false });
      } else {
        this.setState({ openPostFormModal: false });
      }
    });

    SocketIO.on(SOCKET_EVENT_TYPE.NEW_EVENT, (data) => {
      if (data.onlyFor.includes(-1)) {
        if (data.UserId === null || data.UserId === this.props.userProfile.id) {
          this.props.pushNotification(data);
        }
      }

      if (
        !isEmpty(data.onlyFor) &&
        data.onlyFor.includes(this.props.userProfile.id)
      ) {
        this.props.pushNotification(data);
      }
    });

    SocketIO.on(SOCKET_EVENT_TYPE.LIVE_CHANGE, () => {
      this.props.getLive();
    });

    this.props.getCategories();
    this.props.getLive();
    this.props.getEditorSignature();
  }

  componentDidUpdate(prevProps) {
    const { userProfile: prevUser } = prevProps;
    const { userProfile: curUser } = this.props;

    if (isEmpty(prevUser) && !isEmpty(curUser)) {
      this.props.getLive();
    }
  }

  componentWillUnmount() {
    SocketIO.off();
  }

  updateDimensions() {
    this.props.setDimensions(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 576) this.props.setIsMobile(true);
    else this.props.setIsMobile(false);
  }

  onHidePaymentModal = () => {
    this.setState({ openPaymentModal: false });
  };

  onHidePaymentPanel = () => {
    this.setState({ openPaymentPanel: false });
  };

  onHideInviteFriendModal = () => {
    this.setState({ openInviteFriendModal: false });
  };

  onHideInviteFriendPanel = () => {
    this.setState({ openInviteFriendPanel: false });
  };

  onHidePostFormModal = () => {
    this.setState({ openPostFormModal: false });
  };

  onHidePostFormPanel = () => {
    this.setState({ openPostFormPanel: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.onHidePaymentPanel();
    // this.props.upgradePlan({
    //   user: this.props.userProfile.id,
    //   memberShip: "premium",
    // });
  };

  handleInviteFriend = (data) => {
    this.props.inviteFriend(data.email);
    this.onHideInviteFriendPanel();
  };

  render() {
    const {
      openPaymentModal,
      openPaymentPanel,
      openInviteFriendModal,
      openInviteFriendPanel,
      openPostFormModal,
      openPostFormPanel,
    } = this.state;

    return (
      <div className="App" style={{ minHeight: "100vh" }}>
         <HelmetMetaData></HelmetMetaData>
        <Layout style={{ height: "100vh", overflow: "hidden" }}>
          <Sider />
          <Layout>
            <TopHeader />
            <Content />
            <FeedbackBox />
          </Layout>
        </Layout>
        <ProfileDrawer />
        <LibraryShareDrawer />
        <AttendanceDisclaimerModal />
        {(this.props.loading || this.props.authLoading) && (
          <div className="loading-container">
            <Spin indicator={<img src={IconLoading} alt="loading-img" />} />
          </div>
        )}
        <PaymentModal
          visible={openPaymentModal}
          onPay={this.onHidePaymentModal}
          onCancel={this.onHidePaymentModal}
        />
        {openPaymentPanel && (
          <PaymentForm
            handleSubmit={this.handleSubmit}
            hidePanel={this.onHidePaymentPanel}
          />
        )}
        <InviteFriendModal
          visible={openInviteFriendModal}
          onInvite={this.onHideInviteFriendModal}
          onCancel={this.onHideInviteFriendModal}
        />
        {openInviteFriendPanel && (
          <InviteFriendForm
            handleSubmit={this.handleInviteFriend}
            hidePanel={this.onHideInviteFriendPanel}
          />
        )}
        <PostFormModal
          visible={openPostFormModal}
          onInvite={this.onHidePostFormModal}
          onCancel={this.onHidePostFormModal}
        />
        {openPostFormPanel && (
          <PostForm
            handleSubmit={this.handlePostForm}
            hidePanel={this.onHidePostFormPanel}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...envSelector(state),
  loading: homeSelector(state).loading,
  userProfile: homeSelector(state).userProfile,
  authLoading: authSelector(state).loading,
});

const mapDispatchToProps = {
  ...envActions,
  upgradePlan,
  inviteFriend,
  getCategories,
  getChannelCategories,
  getLive,
  pushNotification,
  setJoinCouncilEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
