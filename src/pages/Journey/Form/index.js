import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Checkbox, Row, Col } from 'antd';

import { categorySelector } from "redux/selectors/categorySelector";
import { journeySelector } from "redux/selectors/journeySelector";

import {
  CustomInput,
  CustomCheckbox,
  CustomButton,
} from "components";

import "./style.scss";

const JourneyForm = ({
  allCategories,
  onSave,
  onCancel,
  journey,
}) => {
  return (<div className="learning-journey-form">
    <h3>{ journey != null ? 'Update' : 'Create' } learning journey</h3>

    <Form
      layout="vertical"
      onFinish={onSave}
      initialValues={journey}
    >
      <Form.Item
        label="Journey name"
        name="name"
      >
        <CustomInput></CustomInput>
      </Form.Item>
      <Form.Item
        label="What do you want to focus on?"
        name="topics"
      >
        <Checkbox.Group>
          <Row>
            {allCategories.map((item) => (
              <Col key={`column-${item.value}`} span={8}>
                <CustomCheckbox
                  key={item.value}
                  value={item.value}
                  size="sm"
                >
                  {item.title}
                </CustomCheckbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        label="What content type you like to learn more?"
        name="contentType"
      >
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <CustomCheckbox
                key={'article'}
                value={'article'}
                size="sm"
              >
                Article
              </CustomCheckbox>
            </Col>
            <Col span={8}>
              <CustomCheckbox
                key={'video'}
                value={'video'}
                size="sm"
              >
                Video
              </CustomCheckbox>
            </Col>
            <Col span={8}>
              <CustomCheckbox
                key={'event'}
                value={'event'}
                size="sm"
              >
                Event
              </CustomCheckbox>
            </Col>
            <Col span={8}>
              <CustomCheckbox
                key={'podcast'}
                value={'podcast'}
                size="sm"
              >
                Podcast
              </CustomCheckbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item>
        <div className="mentor-setting-footer">
          <CustomButton
            text="Cancel"
            type="third outlined"
            size="xl"
            onClick={onCancel}
          />
          <CustomButton
            text="Save"
            type="secondary"
            size="lg"
            htmlType="submit"
          />
        </div>
      </Form.Item>
    </Form>

  </div>);
};

JourneyForm.propTypes = {
  allCategories: PropTypes.array,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  journey: PropTypes.object,
};

JourneyForm.defaultProps = {
  allCategories: [],
  onSave: () => {},
  onCancel: () => {},
  journey: null,
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  journey: journeySelector(state).journey,
});

export default connect(mapStateToProps)(JourneyForm);