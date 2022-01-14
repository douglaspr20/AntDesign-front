import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  BusinessDocumentsCard,
  // CustomButton,
  // UploadResumeModal,
} from "components";
import { businessPartnerSelector } from "redux/selectors/businessPartnerSelector";
import {
  getBusinessPartnerResources,
  setBusinessPartnerResources,
  uploadDocumentFile,
  getBusinessPartnerDocuments,
} from "redux/actions/business-partner-actions";

const BusinessPartnerDocuments = ({
  getBusinessPartnerDocuments,
  businessPartnerDocuments,
  currentTab,
}) => {

  useEffect(() => {
    getBusinessPartnerDocuments();
  }, [getBusinessPartnerDocuments]);
  return (
    <div>
      {businessPartnerDocuments?.map((item) => (
        <BusinessDocumentsCard documentFile={item} key={item.id} />
      ))}
      {/* <CustomButton
        size="xs"
        text="Upload file"
        onClick={() => setShowResumeModal(true)}
      />
      <UploadResumeModal
        visible={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      /> */}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  businessPartnerDocuments:
    businessPartnerSelector(state).businessPartnerDocuments,
});

const mapDispatchToProps = {
  getBusinessPartnerResources,
  setBusinessPartnerResources,
  getBusinessPartnerDocuments,
  uploadDocumentFile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessPartnerDocuments);
