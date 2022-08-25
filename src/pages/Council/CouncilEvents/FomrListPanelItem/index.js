import React, { useEffect } from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { DatePicker, Form, InputNumber } from "antd";
import { CustomInput } from "components";

const { RangePicker } = DatePicker;

const FormListPanelItem = ({
  restField,
  index,
  name,
  limit,
  numOfPanels,
  setNumOfPanels,
  remove,
  disableDate,
}) => {
  useEffect(() => {
    if (index + 1 >= limit) {
      remove(name);

      if (numOfPanels > limit) {
        setNumOfPanels((state) => state - 1);
      }
    }
  }, [limit, index, remove, name, numOfPanels, setNumOfPanels]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <Form.Item {...restField}>
        <div className="add-panel-title">
          <h3>Panel #{index + 2}</h3>
          <MinusCircleOutlined
            onClick={() => {
              setNumOfPanels((state) => state - 1);
              remove(name);
            }}
          />
        </div>
      </Form.Item>
      <Form.Item
        {...restField}
        label="Panel name"
        name={[name, "panelName"]}
        rules={[{ required: true }]}
      >
        <CustomInput />
      </Form.Item>
      <Form.Item
        {...restField}
        label="Start and End Date"
        name={[name, "panelStartAndEndDate"]}
        rules={[{ required: true }]}
      >
        <RangePicker
          showTime
          disabledDate={(date) => disableDate(date, true)}
          style={{ width: "100%" }}
          size="large"
          format="YYYY-MM-DD HH:mm"
        />
      </Form.Item>
      <Form.Item
        {...restField}
        label="Number of panelists"
        name={[name, "numberOfPanelists"]}
        rules={[{ required: true }]}
      >
        <InputNumber size="large" min="1" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        {...restField}
        label="Link to join each panel"
        name={[name, "linkToJoin"]}
        rules={[{ required: true, type: "url" }]}
      >
        <CustomInput />
      </Form.Item>
    </div>
  );
};

export default FormListPanelItem;
