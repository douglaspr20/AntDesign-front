import React, { Component } from "react";
import { connect } from "react-redux";

import { Spin, Layout } from "antd";

import Content from "containers/Content";
import TopHeader from "containers/TopHeader";
import Sider from "containers/Sider";
import ProfileDrawer from "containers/ProfileDrawer";
import EventDrawer from "containers/EventDrawer";
import MemberDrawer from "containers/MemberDrawer";
import Emitter from "services/emitter";

import PaymentModal from "./containers/PaymentModal";
import PaymentForm from "./containers/PaymentForm";
import FeedbackBox from "./containers/FeedbackBox";
import AttendanceDisclaimerModal from "./containers/AttendanceDisclaimerModal";
import { EVENT_TYPES } from "enum";

import IconLoading from "images/icon-loading.gif";

import { actions as envActions } from "redux/actions/env-actions";
import { upgradePlan } from "redux/actions/home-actions";
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

  handleSubmit = (event) => {
    event.preventDefault();
    this.onHidePaymentPanel();
    this.props.upgradePlan({
      user: this.props.userProfile.id,
      memberShip: "premium",
    });
  };

  render() {
    const { openPaymentModal, openPaymentPanel } = this.state;

    return (
      <div className="App" style={{ minHeight: "100vh" }}>
        <Layout style={{ height: "100vh" }}>
          <Sider />
          <Layout>
            <TopHeader />
            <Content />
            <FeedbackBox/>
          </Layout>
        </Layout>
        <ProfileDrawer />
        <EventDrawer />
        <MemberDrawer />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
