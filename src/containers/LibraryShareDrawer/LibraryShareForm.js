import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Checkbox, Radio } from "antd";

import {
  CustomInput,
  CustomCheckbox,
  CustomRadio,
  // CustomSelect,
  CustomButton,
  ImageUpload,
} from "components";
import { SEARCH_FILTERS } from "enum";

import { addLibrary } from "redux/actions/library-actions";
import { createCouncilResource } from "redux/actions/council-actions";
import { librarySelector } from "redux/selectors/librarySelector";
import { categorySelector } from "redux/selectors/categorySelector";

import "./style.scss";

const SearchFilters = SEARCH_FILTERS.library;
// const Languages = LANGUAGES.ParsedLanguageData;

const LibraryShareForm = ({
  allCategories,
  onCancel,
  addLibrary,
  createCouncilResource,
}) => {
  const isCouncil = document.location.href.includes("council");

  const onFinish = (values) => {
    if (isCouncil) {
      onCancel();
      return createCouncilResource(values);
    }
    onCancel();
    addLibrary(values);
  };

  const onFinishFailed = () => {};

  return (
    <div className="library-share-form">
      <h1 className="library-share-form-title">
        Share Resource With Your Experts Council Peers
      </h1>
      {/* <h3 className="library-share-form-desc">
        Contribute with new content to the community. The content will be
        reviewed and analyzed by the lead member of HHR community. Thanks for
        sharing, we will let you know if your content is selected.
        </h3> */}
      <Form
        className="library-form"
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="title" label="Title">
          <CustomInput />
        </Form.Item>
        <Form.Item name="link" label="URL">
          <CustomInput addonBefore="https://" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <CustomInput multiple={true} />
        </Form.Item>
        <Form.Item name="topics" label="What are the content topics?">
          <Checkbox.Group className="d-flex flex-column library-form-topics">
            {allCategories.map((topic, index) => (
              <CustomCheckbox key={index} value={topic.value}>
                {topic.title}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="contentType" label="What is the content type?">
          <Radio.Group className="library-form-types">
            {SearchFilters["Content type"].map((type, index) => (
              <CustomRadio key={index} value={type.value}>
                {type.text}
              </CustomRadio>
            ))}
          </Radio.Group>
        </Form.Item>
        {isCouncil ? (
          ""
        ) : (
          <Form.Item name="image" label="Upload image">
            <ImageUpload aspect={400 / 152} />
          </Form.Item>
        )}
        {/* <Form.Item name="language" label="Main language">
          <CustomSelect
            showSearch
            options={Languages}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </Form.Item> */}
        <div className="library-share-form-footer">
          <CustomButton
            text="Cancel"
            type="third outlined"
            size="lg"
            onClick={onCancel}
          />
          <CustomButton
            htmlType="submit"
            text="Submit"
            type="secondary"
            size="lg"
          />
        </div>
      </Form>
    </div>
  );
};

LibraryShareForm.propTypes = {
  onCancel: PropTypes.func,
};

LibraryShareForm.defaultProps = {
  onCancel: () => {},
};

const mapStateToProps = (state) => ({
  allLibraries: librarySelector(state).allLibraries,
  allCategories: categorySelector(state).categories,
});

const mapDispatchToProps = {
  addLibrary,
  createCouncilResource,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryShareForm);
