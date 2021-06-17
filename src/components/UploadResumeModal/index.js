import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FilePdfOutlined, DeleteOutlined } from "@ant-design/icons";

import { CustomModal, CustomButton } from "components";

import "./style.scss";

const UploadResumeModal = ({ visible, onClose }) => {
  const fileRef = useRef(null);
  const [selectedFileInfo, setSelectedFileInfo] = useState({});

  const onUploadResume = () => {
    if (fileRef && fileRef.current) {
      fileRef.current.click();
    }
  };

  const onFileChange = () => {
    if (fileRef && fileRef.current) {
      setSelectedFileInfo(fileRef.current.files[0]);
    }
  };

  return (
    <CustomModal
      title="Upload your resume"
      centered
      visible={visible}
      width={500}
      maskClosable={false}
      onCancel={onClose}
    >
      <div className="upload-resume">
        <div className="upload-resume-form">
          <span className="upload-resume-form-label">Resume:</span>
          {!!selectedFileInfo.name ? (
            <>
              <FilePdfOutlined className="upload-resume-form-pdficon" />
              <span className="upload-resume-filename">
                {selectedFileInfo.name}
              </span>
              <DeleteOutlined className="upload-resume-form-delete" />
            </>
          ) : (
            <span className="upload-resume-none">-</span>
          )}
        </div>
        <div className="upload-resume-footer">
          <CustomButton
            text="Upload"
            className="upload-resume-upload"
            type="primary"
            size="xs"
            onClick={onUploadResume}
          />
          <CustomButton
            text="Close"
            className="upload-resume-upload"
            type="primary outlined"
            size="xs"
            style={{ marginLeft: "1rem" }}
            onClick={onClose}
          />
        </div>
        <input
          id="file-upload"
          ref={fileRef}
          style={{ display: "none" }}
          type="file"
          onChange={onFileChange}
          accept=".pdf"
        />
      </div>
    </CustomModal>
  );
};

UploadResumeModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

UploadResumeModal.defaultProps = {
  visible: false,
  onClose: () => {},
};

export default UploadResumeModal;
