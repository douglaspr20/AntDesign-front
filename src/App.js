import React, { Component } from "react";
import { connect } from "react-redux";

import { setDimensions, setIsMobile } from "./redux/actions/env-actions";
import { Spin, Layout } from "antd";

import Content from "containers/Content";
import TopHeader from "containers/TopHeader";
import Sider from "containers/Sider";
import ProfileDrawer from "containers/ProfileDrawer";

import IconLoading from "images/icon-loading.gif";

import "./styles/main.scss";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.props.setDimensions(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 480) this.props.setIsMobile(true);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.props.setDimensions(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 480) this.props.setIsMobile(true);
    else this.props.setIsMobile(false);
  }

  render() {
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
        {this.props.home.loading && (
          <div className="loading-container">
            <Spin indicator={<img src={IconLoading} alt="loading-img" />} />
          </div>
        )}
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
