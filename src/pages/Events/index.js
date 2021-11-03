import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment-timezone";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import clsx from "clsx";
import { notification } from "antd";
import converter from "number-to-words";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";

import { Tabs, EventFilterPanel } from "components";
import EventDrawer from "containers/EventDrawer";
import { MONTH_NAMES } from "enum";
import EventList from "./EventList";
import {
  getAllEvent,
  addToMyEventList,
  removeFromMyEventList,
  getMyEvents,
  claimEventAttendance,
  claimEventCredit,
} from "redux/actions/event-actions";
import {
  setLoading,
  attendToGlobalConference,
} from "redux/actions/home-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import EventFilterDrawer from "./EventFilterDrawer";
import EventClaimModal from "./EventClaimModal";

import ImgCertificateStamp from "images/img-certificate-stamp.png";
import ImgHHRLogo from "images/img-certificate-logo.png";
import ImgSignature from "images/img-signature.png";

import { convertBlobToBase64 } from "utils/format";

import "./style.scss";

const EventsPage = ({
  allEvents,
  myEvents,
  updatedEvent,
  userProfile,
  getAllEvent,
  getMyEvents,
  addToMyEventList,
  attendToGlobalConference,
  removeFromMyEventList,
  claimEventAttendance,
  claimEventCredit,
  setLoading,
}) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [currentTab, setCurrentTab] = useState("0");
  const [filterParams, setFilterParams] = useState({});
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [eventForCredit, setEventForCredit] = useState({});

  const DataFormat = "YYYY.MM.DD hh:mm A";

  const addMyEvents = (event) => {
    const timezone = moment.tz.guess();

    if (event.going) {
      addToMyEventList(event, timezone);
      if (event.isAnnualConference === 1) {
        attendToGlobalConference();
      }
    } else {
      removeFromMyEventList(event);
      if (event?.isAnnualConference === 1) {
        attendToGlobalConference();
      }
    }
  };

  const onEventClick = (event) => {
    setVisible(true);
    setEvent({
      ...event,
      day: moment(event.date, DataFormat).date(),
      month: MONTH_NAMES[moment(event.date, DataFormat).month()],
    });
  };

  const onConfirmAttendance = (event) => {
    claimEventAttendance(event.id);
  };

  const onConfirmCredit = (event) => {
    setEventForCredit(event);
    setModalVisible(true);
  };

  const onClaimCredit = async () => {
    const pdf = await generatePDF();

    claimEventCredit(eventForCredit.id, pdf, (err) => {
      if (err) {
        notification.error({
          message: "Error",
          description: (err || {}).msg,
        });
      } else {
        notification.info({
          message: "Email was send successfully.",
        });
        setModalVisible(false);
      }
    });
  };

  const TabData = [
    {
      title: "Upcoming events",
      content: () => (
        <EventList
          data={filteredEvents}
          onAttend={addMyEvents}
          onClick={onEventClick}
          userProfile={userProfile}
          showFilter={() => setVisibleFilter(true)}
        />
      ),
    },
    {
      title: "My events",
      content: () => (
        <EventList
          data={myEvents.filter((event) => event.status === "going")}
          onAttend={addMyEvents}
          onClick={onEventClick}
          userProfile={userProfile}
          showFilter={() => setVisibleFilter(true)}
        />
      ),
    },
    {
      title: "My past events",
      content: () => (
        <EventList
          data={myEvents.filter(
            (event) => !["going", "attend"].includes(event.status)
          )}
          onAttend={addMyEvents}
          onClick={onEventClick}
          userProfile={userProfile}
          onConfirmAttendance={onConfirmAttendance}
          onConfirmCredit={onConfirmCredit}
          showFilter={() => setVisibleFilter(true)}
        />
      ),
    },
  ];

  const onFilterChange = (params, redirect = false) => {
    setFilterParams(params);
    setFilteredEvents((prev) => {
      prev = allEvents.filter((item) => {
        let flag = true;

        if (params.date) {
          const res = moment(item.date, "YYYY.MM.DD h:mm a");
          const eventDate = {
            year: res.year(),
            month: res.month(),
            day: res.date(),
          };

          const currentDate = {
            year: params.date.year(),
            month: params.date.month(),
            day: params.date.date(),
          };

          flag = isEqual(eventDate, currentDate);
        }

        if (params["Topics"] && params["Topics"].length > 0) {
          flag =
            flag &&
            (params["Topics"] || []).some((tpc) =>
              item.categories.includes(tpc)
            );
        }

        if (isEmpty(params)) {
          const eventDate = moment(item.date, "YYYY.MM.DD h:mm a");
          flag = eventDate.isAfter(moment());
        }

        return flag;
      });
      return [...prev];
    });
    if (redirect) {
      setCurrentTab("0");
    }
  };

  const onEventDrawerClose = () => {
    setVisible(false);
  };

  const getPerodOfEvent = (startDate, endDate) => {
    const duration = moment.duration(moment(endDate).diff(moment(startDate)));

    return duration.asHours();
  };

  const period = getPerodOfEvent(
    eventForCredit.startDate,
    eventForCredit.endDate
  );

  const generatePDF = async () => {
    setLoading(true);
    const domElement = document.getElementById("certificate-panel");
    const canvas = await html2canvas(domElement, { scale: 4 });

    const width = domElement.clientWidth;
    const height = domElement.clientHeight;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPdf({
      orientation: "landscape",
      format: [2000, (2000 / width) * height],
      unit: "px",
      hotfixes: ["px_scaling"],
      precision: 32,
    });

    pdf.addImage(
      imgData,
      "jpeg",
      0,
      0,
      2000,
      (2000 / width) * height,
      "",
      "SLOW"
    );

    const blobPdf = pdf.output("blob");

    setLoading(false);
    return await convertBlobToBase64(blobPdf);
  };

  useEffect(() => {
    if (!allEvents || allEvents.length === 0) {
      getAllEvent();
    }
    if (!myEvents || myEvents.length === 0) {
      getMyEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onFilterChange(filterParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allEvents]);

  useEffect(() => {
    if (event && updatedEvent && event.id === updatedEvent.id) {
      setEvent({
        ...updatedEvent,
        day: moment(updatedEvent.date, DataFormat).date(),
        month: MONTH_NAMES[moment(updatedEvent.date, DataFormat).month()],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedEvent]);

  useEffect(() => {
    onFilterChange({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("****** rendering ******");

  return (
    <div className="events-page">
      <EventFilterDrawer
        onFilterChange={(data) => onFilterChange(data, true)}
      />
      <div className={clsx("events-page-filter", { visible: visibleFilter })}>
        <EventFilterPanel
          title="Categories"
          onFilterChange={(data) => onFilterChange(data, true)}
          onClose={() => setVisibleFilter(false)}
        />
      </div>
      <div className="events-page-wrapper">
        <div className="events-page-container">
          <Tabs data={TabData} current={currentTab} onChange={setCurrentTab} />
        </div>
      </div>
      <EventDrawer
        visible={visible}
        event={event}
        onClose={onEventDrawerClose}
        onConfirmCredit={onConfirmCredit}
      />
      <EventClaimModal
        visible={modalVisible}
        title="HR Credit Offered"
        destroyOnClose={true}
        data={eventForCredit}
        onClaim={onClaimCredit}
        onCancel={() => setModalVisible(false)}
      />
      {!isEmpty(eventForCredit) && (
        <div
          className="event-certificate certificate-page-wrapper"
          id="certificate-panel"
        >
          <div className="certificate">
            <div className="certificate-top">
              <div className="certificate-logo">
                <img src={ImgHHRLogo} alt="sidebar-logo" />
              </div>
              <h3 className="certificate-title">
                Hacking HR's Certificate of Participation
              </h3>
              <h1 className="certificate-username">{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
            </div>
            <div className="certificate-center">
              <h5 className="certificate-text1 organizer">
                {`For Attending ${eventForCredit.organizer} Session:`}
              </h5>
              <h4 className="certificate-text2">{eventForCredit.title}</h4>
              <h5 className="certificate-text1 duration">{`Duration: ${converter.toWords(
                period
              )} Hour${period > 1 ? "s" : ""}`}</h5>
            </div>
            <div className="certificate-bottom">
              <div className="certificate-bottom-sign">
                <h5 className="certificate-text1 date">{`${moment(
                  eventForCredit.startDate
                ).format("MMMM DD, YYYY")}`}</h5>
                <div className="certificate-divider" />
                <h5 className="certificate-text1">Date</h5>
              </div>
              <div className="certificate-bottom-image">
                <img src={ImgCertificateStamp} alt="certificate-img" />
              </div>
              <div className="certificate-bottom-sign">
                <div className="certificate-signature">
                  <img src={ImgSignature} alt="certificate-signature" />
                </div>
                <div className="certificate-divider" />
                <h5 className="certificate-text1 signature">
                  Founder at Hacking HR
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

EventsPage.propTypes = {
  title: PropTypes.string,
};

EventsPage.defaultProps = {
  title: "",
};

const mapStateToProps = (state) => ({
  myEvents: eventSelector(state).myEvents,
  allEvents: eventSelector(state).allEvents,
  updatedEvent: eventSelector(state).updatedEvent,
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  getAllEvent,
  getMyEvents,
  addToMyEventList,
  removeFromMyEventList,
  attendToGlobalConference,
  claimEventAttendance,
  claimEventCredit,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
