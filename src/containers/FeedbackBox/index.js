import React, { Component } from "react";
import { connect } from "react-redux";
import { CustomButton, CustomInput } from "components";

import IconChevronDown from "images/icon-chevron-down.svg";

import { sendEmail } from "api/module/feedback";
import { authSelector } from "redux/selectors/authSelector";

import "./style.scss";

class FeedbackBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: "",
      loadingMessage: "Sending...",
      heightFeedbackBox: "25px",
      rotateArrow: "rotate(0deg)",
    };
  }
  onChangeMessage(text) {
    this.setState({ message: text });
  }
  onSend() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        let data = {
          message: this.state.message,
        };
        let result = await sendEmail(data);
        if (result.status === 200) {
          this.setState(
            {
              message: "",
              loadingMessage: "Thank you!",
            },
            () => {
              setTimeout(() => {
                this.setState({
                  loading: false,
                  loadingMessage: "Sending...",
                });
              }, 500);
            }
          );
        }
      }
    );
  }
  changeHeightFeedbackBox() {
    if (this.state.heightFeedbackBox === "auto") {
      this.setState({
        heightFeedbackBox: "25px",
        rotateArrow: "rotate(180deg)",
      });
    } else {
      this.setState({ heightFeedbackBox: "auto", rotateArrow: "rotate(0deg)" });
    }
  }
  render() {
    return (
      <>
        {this.props.userId && (
          <div
            className="feedback-box-container"
            style={{ height: this.state.heightFeedbackBox }}
          >
            <div
              className="feedback-box-container__header"
              onClick={() => {
                this.changeHeightFeedbackBox();
              }}
            >
              <h5>
                <img
                  src={IconChevronDown}
                  style={{ transform: this.state.rotateArrow }}
                  alt="icon-chevron"
                />{" "}
                Please Help Us Improve The LAB
              </h5>
            </div>
            <div className="feedback-box-container__container">
              <CustomInput
                className="feedback-box-container__container--textarea"
                multiple={true}
                value={this.state.message}
                onChange={(text) => {
                  this.onChangeMessage(text);
                }}
              ></CustomInput>
            </div>
            <div className="feedback-box-container__button">
              {this.state.loading ? (
                this.state.loadingMessage
              ) : (
                <CustomButton
                  text="Send"
                  type="primary"
                  size="sm"
                  className=""
                  onClick={() => {
                    this.onSend();
                  }}
                ></CustomButton>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  userId: authSelector(state).id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackBox);
