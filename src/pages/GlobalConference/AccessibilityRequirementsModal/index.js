import React from "react";
import { connect } from "react-redux";
import { Modal, notification, Timeline } from "antd";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { CustomButton } from "components";
import { homeSelector } from "redux/selectors/homeSelector";
import { confirmAccessibilityRequirements } from "redux/actions/home-actions";

const AccessibilityRequirementsModal = ({
  visible,
  onCancel,
  userProfile,
  confirmAccessibilityRequirements,
}) => {
  const handleConfirmAccessibilityRequirements = (userId) => {
    confirmAccessibilityRequirements(userId, (error) => {
      if (error) {
        notification.error({
          message: error || "Something went wrong. Please try again.",
        });
      }
    });
    onCancel(false);
  };

  return (
    <Modal
      title="We would love to hear about your access requirements. The ways we can help are:"
      centered
      visible={visible}
      width={800}
      footer={[
        <CustomButton
          text="Click here to confirm (we will get in touch with you)"
          onClick={() => handleConfirmAccessibilityRequirements(userProfile.id)}
          size="xs"
        />,
      ]}
      onCancel={onCancel}
    >
      <TransformWrapper initialScale={1}>
        {({ zoomIn, zoomOut }) => (
          <div style={{ display: "flex" }}>
            <TransformComponent>
              <Timeline style={{ padding: "20px" }}>
                <Timeline.Item>
                  Help reviewing or selecting your sessions to build your own
                  agenda (perhaps due to a vision, hearing or learning
                  impairment)
                </Timeline.Item>
                <Timeline.Item>
                  A transcript or only-audio file of the sessions (although
                  autogenerated captions will be provided for all the panels
                  during the conference, and for the presentations the week
                  after the conference).
                </Timeline.Item>
                <p>
                  Please confirm below and we will get in touch in touch with
                  you via email. Thank you!
                </p>
              </Timeline>
            </TransformComponent>
            <div>
              <CustomButton
                className="zoom-button"
                text="+"
                onClick={(e) => zoomIn(e)}
              />
              <CustomButton
                className="zoom-button"
                text="-"
                onClick={(e) => zoomOut(e)}
              />
            </div>
          </div>
        )}
      </TransformWrapper>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  confirmAccessibilityRequirements,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccessibilityRequirementsModal);