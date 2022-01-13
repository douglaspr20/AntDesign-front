import { notification } from "antd";
import { CustomButton, UploadResumeModal } from "components";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { businessPartnerSelector } from "redux/selectors/businessPartnerSelector";
import {
  getBusinessPartnerResources,
  setBusinessPartnerResources,
  updateBusinessPartnerResourcesInformation,
  uploadDocumentFile,
} from "redux/actions/business-partner-actions";

const BusinessPartnerDocuments = ({
  getBusinessPartnerResources,
  uploadDocumentFile,
}) => {
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <div>
      <CustomButton
        size="xs"
        text="Upload file"
        onClick={() => setShowResumeModal(true)}
      />
      <UploadResumeModal
        visible={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  businessPartnerResources:
    businessPartnerSelector(state).businessPartnerResources,
});

const mapDispatchToProps = {
  getBusinessPartnerResources,
  setBusinessPartnerResources,
  updateBusinessPartnerResourcesInformation,
  uploadDocumentFile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessPartnerDocuments);
