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
  const fileRef = useRef(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onUploadResume = () => {
    console.log("upload");
    if (fileRef && fileRef.current) {
      fileRef.current.click();
    }
  };

  const onFileChange = async () => {
    if (fileRef && fileRef.current) {
      const file = fileRef.current.files[0];
      console.log(file);
      setErrorMessage("");
      let formData = new FormData();
      formData.append("document", file);
      setLoading(true);
      const response = await new Promise((resolve) => {
        uploadDocumentFile(formData, (error) => {
          if (error) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
      console.log(response);
      if (response) {
        notification.success({
          message: "Success",
          description: "Resume was saved",
        });
        //   onClose();
      } else {
        setErrorMessage("Something went wrong. Please try again!");
      }
      setLoading(false);
    }
  };

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
