import React, { Component } from "react";
import { connect } from "react-redux";

import { setDimensions, setIsMobile } from "./redux/actions/env-actions";
import { Layout } from "antd";

import Content from "containers/Content";
import TopHeader from "containers/TopHeader";
import Sider from "containers/Sider";
import { EVENT_TYPES } from "enum";
import Emitter from "services/emitter";

import "./styles/main.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.setDimensions(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 480) this.props.setIsMobile(true);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    Emitter.on(EVENT_TYPES.EVENT_VIEW_PROFILE, () => {
      console.log("event accepted");
    });
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
