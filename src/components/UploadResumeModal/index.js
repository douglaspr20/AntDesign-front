import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FilePdfOutlined, DeleteOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { CustomModal, CustomButton } from "components";
import { uploadResume } from "redux/actions/home-actions";
import IconLoading from "images/icon-loading.gif";

import "./style.scss";

const UploadResumeModal = ({ visible, onClose, uploadResume }) => {
  const fileRef = useRef(null);
  const [selectedFileInfo, setSelectedFileInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onUploadResume = () => {
    if (fileRef && fileRef.current) {
      fileRef.current.click();
    }
  };

  const onFileChange = async () => {
    if (fileRef && fileRef.current) {
      // check file type
      const file = fileRef.current.files[0];
      const supportedTypes = ["application/pdf"];

      if (!supportedTypes.includes(file.type)) {
        setErrorMessage("Invalid format!");
        return;
      }

      setErrorMessage("");
      let formData = new FormData();
      formData.append("resume", file);

      setLoading(true);
      const response = await new Promise((resolve) => {
        uploadResume(formData, (error) => {
          if (error) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
      if (response) {
        setSelectedFileInfo(file);
        console.log("***** success upload");
      } else {
        setErrorMessage("Something went wrong. Please try again!");
      }
      setLoading(false);
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
        {loading && (
          <div className="loading-container">
            <Spin indicator={<img src={IconLoading} alt="loading-img" />} />
          </div>
        )}
        {!loading && (
          <React.Fragment>
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
            {errorMessage && (
              <div className="upload-resume-error">{errorMessage}</div>
            )}
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
          </React.Fragment>
        )}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  uploadResume,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadResumeModal);
