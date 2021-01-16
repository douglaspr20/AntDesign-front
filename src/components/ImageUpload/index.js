import React, { useState } from "react";
import PropTypes from "prop-types";
import { Upload } from "antd";

import { CustomButton } from "components";

import "./style.scss";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ImageUpload = ({ value, onChange }) => {
  const [fileList, setFileList] = useState([]);
  const [src, setSrc] = useState("");

  const imageUpload = async ({ file, onSuccess }) => {
    const base64FormatFile = await getBase64(file);
    onChange(base64FormatFile);
    setSrc(base64FormatFile);
    onSuccess("ok");
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const removeFile = () => {};

  return (
    <div
      className="image-upload"
      style={src ? { backgroundImage: `url("${src}")` } : {}}
    >
      <Upload
        customRequest={imageUpload}
        listType="image-upload-control"
        fileList={fileList}
        maxCount={1}
        onChange={handleChange}
        onRemove={removeFile}
      >
        <CustomButton text="Upload image" size="md" type="primary outlined" />
      </Upload>
    </div>
  );
};

ImageUpload.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

ImageUpload.defaultProps = {
  value: "",
  onChange: () => {},
};

export default ImageUpload;
