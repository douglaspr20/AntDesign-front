import React, { Component } from "react";
import { connect } from "react-redux";
import { CustomButton, CustomInput } from "components";

import { sendEmail } from 'api/module/feedback';
import { authSelector } from "redux/selectors/authSelector";

import "./style.scss";

class FeedbackBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: '',
      loadingMessage: 'Sending...',
    };
  }
  onChangeMessage(text) {
    this.setState({ message: text });
  }
  onSend() {
    this.setState({
      loading: true
    }, async () => {
      let data = {
        message: this.state.message,
        userId: this.props.userId,
      }
      let result = await sendEmail(data);
      if (result.status === 200) {
        this.setState({ 
          message: '', 
          loadingMessage: 'Thank you!' 
        }, () => {
          setTimeout(() => {
            this.setState({
              loading: false,
              loadingMessage: 'Sending...' 
            });
          }, 500);
        });
      }
    });
  }
  render() {
    return (
      <div className="feedback-box-container">
        <div className="feedback-box-container__header">
          <h5>Please Provide Feedback!</h5>
        </div>
        <div className="feedback-box-container__container">
          <CustomInput
            className="feedback-box-container__container--textarea"
            multiple={true}
            value={this.state.message}
            onChange={(text) => { this.onChangeMessage(text); }}
          ></CustomInput>
        </div>
        <div className="feedback-box-container__button">
          {this.state.loading
            ? this.state.loadingMessage
            : <CustomButton
              text="Send"
              type="primary"
              size="sm"
              className=""
              onClick={() => { this.onSend(); }}
            ></CustomButton>}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userId: authSelector(state).id,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackBox);