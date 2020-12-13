import React, { Component } from "react";
import { connect } from "react-redux";

import { setDimensions, setIsMobile } from "./redux/actions/env-actions";
import { Spin, Layout } from "antd";

import Content from "containers/Content";
import TopHeader from "containers/TopHeader";
import Sider from "containers/Sider";
import ProfileDrawer from "containers/ProfileDrawer";
import EventDrawer from "containers/EventDrawer";
import Emitter from "services/emitter";

import PaymentModal from "./containers/PaymentModal";
import { EVENT_TYPES } from "enum";

import IconLoading from "images/icon-loading.gif";

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
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    Emitter.on(EVENT_TYPES.OPEN_PAYMENT_MODAL, () => {
      this.setState({ openPaymentModal: true });
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

  render() {
    const { openPaymentModal } = this.state;

    return (
      <div className="App" style={{ minHeight: "100vh" }}>
        <Layout style={{ height: "100vh" }}>
          <Sider />
          <Layout>
            <TopHeader />
            <Content />
          </Layout>
        </Layout>
        <ProfileDrawer />
        <EventDrawer />
        {this.props.home.loading && (
          <div className="loading-container">
            <Spin indicator={<img src={IconLoading} alt="loading-img" />} />
          </div>
        )}
        <PaymentModal
          visible={openPaymentModal}
          onPay={this.onHidePaymentModal}
          onCancel={this.onHidePaymentModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};

const mapDispatchToProps = {
  setDimensions,
  setIsMobile,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
