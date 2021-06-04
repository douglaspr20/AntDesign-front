import React, { Component } from "react";
import { connect } from "react-redux";

import { Spin, Layout } from "antd";

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
import FeedbackBox from "./containers/FeedbackBox";
import AttendanceDisclaimerModal from "./containers/AttendanceDisclaimerModal";
import { EVENT_TYPES, SOCKET_EVENT_TYPE } from "enum";

import IconLoading from "images/icon-loading.gif";

import { actions as envActions } from "redux/actions/env-actions";
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
      console.log(this.props.isMobile);
      if (this.props.isMobile) {
        this.setState({ openInviteFriendPanel: true });
      } else {
        this.setState({ openInviteFriendModal: true });
      }
    });

    SocketIO.on(SOCKET_EVENT_TYPE.NEW_EVENT, (data) => {
      this.props.pushNotification(data);
    });

    this.props.getCategories();
    this.props.getLive();
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
    } = this.state;

    return (
      <div className="App" style={{ minHeight: "100vh" }}>
        <Layout style={{ height: "100vh" }}>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
