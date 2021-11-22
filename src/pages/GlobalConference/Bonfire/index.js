import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Form, notification } from "antd";
import moment from "moment";
import { bonfireSelector } from "redux/selectors/bonfireSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { categorySelector } from "redux/selectors/categorySelector";
import {
  getBonfires,
  updateBonfire,
  deleteBonfire,
} from "redux/actions/bonfire-actions";
import { addBonfire, removeBonfire } from "redux/actions/home-actions";
import { setLoading } from "redux/actions/home-actions";
import { CustomInput, CustomSelect, BonfireCard } from "components";
import CategoriesSelect from "components/CategoriesSelect";
import { TIMEZONE_LIST } from "enum";
import { convertToCertainTime } from "utils/format";

const Bonfire = ({
  getBonfires,
  addBonfire,
  removeBonfire,
  updateBonfire,
  deleteBonfire,
  allCategories,
  bonfires,
  userProfile,
}) => {
  const [bonfireForm] = Form.useForm();
  const [bonfiresData, setBonfiresData] = useState([]);
  const [bonfireToEdit, setBonfireToEdit] = useState(null);
  const [modalFormVisible, setModalFormVisible] = useState(false);

  const onAddBonfire = (bonfire) => {
    addBonfire(bonfire);
  };

  const onRemoveBonfire = (bonfire) => {
    removeBonfire(bonfire);
  };

  const onEditBonfire = (bonfire) => {
    setBonfireToEdit({
      ...bonfire,
      time: moment(bonfire.startTime),
    });
    setModalFormVisible(true);
  };

  const onCancelModalForm = () => {
    setModalFormVisible(false);
    setBonfireToEdit(null);
  };

  const handleBonfire = (data) => {
    const timezone = TIMEZONE_LIST.find(
      (timezone) => timezone.value === data.timezone
    );
    const convertedStartTime = moment
      .tz(
        data.time.format("YYYY-MM-DD h:mm a"),
        "YYYY-MM-DD h:mm a",
        timezone.utc[0]
      )
      .utc()
      .format();

    const convertedEndTime = moment
      .tz(
        data.time.format("YYYY-MM-DD h:mm a"),
        "YYYY-MM-DD h:mm a",
        timezone.utc[0]
      )
      .utc()
      .add("hour", 1)
      .format();

    const bonfireInfo = {
      title: data.title,
      description: data.description,
      link: data.link,
      startTime: convertedStartTime,
      endTime: convertedEndTime,
      categories: data.categories,
      bonfireCreator: userProfile.id,
      timezone: data.timezone,
    };

    updateBonfire(bonfireToEdit.id, bonfireInfo, (error) => {
      if (error) {
        notification.error({
          message: error || "Something went wrong. Please try again.",
        });
      } else {
        setModalFormVisible(false);
        getBonfires();
        notification.success({
          message: "Bonfire updated succesfully",
        });
      }
    });
  };

  const onDeleteBonfire = (id) => {
    deleteBonfire(id, (error) => {
      if (error) {
        notification.error({
          message: error || "Something went wrong. Please try again.",
        });
      } else {
        setModalFormVisible(false);
        getBonfires();
        notification.success({
          message: "Bonfire deleted succesfully",
        });
      }
    });
  };

  useEffect(() => {
    const getAllBonfires = async () => {
      getBonfires();
    };

    getAllBonfires();
  }, [getBonfires]);

  useEffect(() => {
    if (bonfires) {
      const sData = (bonfires || [])
        .map((item) => {
          const sTime = convertToCertainTime(item.startTime, item.timezone);
          const eTime = convertToCertainTime(item.endTime, item.timezone);
          let tz = TIMEZONE_LIST.find((t) => t.value === item.timezone);
          if (tz) {
            if (tz.offset > 0) {
              tz = `${tz.abbr} (GMT+${tz.offset})`;
            } else if (tz.offset < 0) {
              tz = `${tz.abbr} (GMT-${-tz.offset})`;
            } else {
              tz = `${tz.abbr} (GMT)`;
            }
          } else {
            tz = "";
          }

          return {
            ...item,
            date: sTime.format("MMM, D, YYYY"),
            period: `${sTime.format("MMMM D")} | From ${sTime.format(
              "h:mm a"
            )} to ${eTime.format("h:mm a")}`,
            hours: `From ${sTime.format("h:mm a")} to ${eTime.format(
              "h:mm a"
            )}`,
            tz: `${tz}`,
          };
        })
        .sort((a, b) => {
          if (a.startTime > b.startTime) {
            return 1;
          } else if (b.startTime > a.startTime) {
            return -1;
          }
          return 0;
        });

      let filteredData = [];

      for (let i = 0; i < sData.length; i++) {
        let isEmpty = true;
        for (let j = 0; j <= filteredData.length; j++) {
          if (sData[i].period === filteredData[j]?.step) {
            filteredData[j].data.push(sData[i]);
            isEmpty = false;
          }
        }

        if (isEmpty) {
          filteredData.push({
            step: sData[i].period,
            data: [sData[i]],
          });
        }
      }

      setBonfiresData(filteredData);
    }
  }, [bonfires]);

  return (
    <div className="conference-list" style={{ marginTop: "14rem" }}>
      <div className="conference-list-container">
        {bonfiresData.map((bonfire, i) =>
          bonfire.data.length > 0 ? (
            <div key={i}>
              <h3 className="session-step">{bonfire.step}</h3>
              {bonfire.data.map((b, i) => (
                <BonfireCard
                  key={i}
                  bonfire={b}
                  added={(userProfile.bonfires || []).includes(b.id)}
                  isBonfireCreator={userProfile.id === b.bonfireCreator}
                  editBonfire={() => onEditBonfire(b)}
                  deleteBonfire={() => onDeleteBonfire(b.id)}
                  onAddBonfire={() => onAddBonfire(b)}
                  onRemoveBonfire={() => onRemoveBonfire(b)}
                />
              ))}
            </div>
          ) : null
        )}
      </div>

      <Modal
        visible={modalFormVisible}
        onCancel={() => {
          onCancelModalForm();
        }}
        onOk={() => {
          bonfireForm.submit();
        }}
      >
        <Form
          form={bonfireForm}
          layout="vertical"
          initialValues={bonfireToEdit}
          onFinish={(data) => {
            handleBonfire(data);
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required." }]}
          >
            <CustomInput />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required." }]}
          >
            <CustomInput multiple={true} />
          </Form.Item>

          <Form.Item
            name="time"
            label="Start time"
            rules={[{ required: true, message: "Time is required." }]}
          >
            <CustomInput type="time" value={bonfireToEdit?.time} />
          </Form.Item>

          <Form.Item
            name={"timezone"}
            label="Timezone"
            rules={[{ required: true, message: "Timezone is required." }]}
          >
            <CustomSelect
              showSearch
              options={TIMEZONE_LIST}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="border"
            />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Categories"
            rules={[{ required: true, message: "Categories is required." }]}
          >
            <CategoriesSelect options={allCategories} />
          </Form.Item>

          <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true, message: "Link is required." }]}
          >
            <CustomInput />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...bonfireSelector(state),
  userProfile: homeSelector(state).userProfile,
  bonfires: bonfireSelector(state).bonfires,
  allCategories: categorySelector(state).categories,
});

const mapDispatchToProps = {
  getBonfires,
  setLoading,
  addBonfire,
  removeBonfire,
  updateBonfire,
  deleteBonfire,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bonfire);
