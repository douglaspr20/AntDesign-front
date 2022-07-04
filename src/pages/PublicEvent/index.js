import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import Helmet from "react-helmet";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import { Modal, Dropdown, Space, Menu, Carousel, Avatar, Tooltip } from "antd";
import moment from "moment";
import { isEmpty } from "lodash";
import GoogleMap from "./GoogleMaps";
import { loadStripe } from "@stripe/stripe-js";

import { getCheckoutSession } from "api/module/stripe";
import {
  capitalizeWord,
  convertToLocalTime,
  getEventPeriod,
} from "utils/format";
import Emitter from "services/emitter";
import { CustomButton, SpecialtyItem, RichEdit } from "components";
import Login from "pages/Login";
import { getEvent, addToMyEventList } from "redux/actions/event-actions";
import { getUser } from "redux/actions/home-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import { authSelector } from "redux/selectors/authSelector";
import { envSelector } from "redux/selectors/envSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { INTERNAL_LINKS, EVENT_TYPES } from "enum";

import "./style.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

const PublicEventPage = ({
  match,
  updatedEvent,
  isAuthenticated,
  isMobile,
  getEvent,
  addToMyEventList,
  history,
  userProfile,
  getUser,
}) => {
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editor, setEditor] = useState("froala");
  const [showFirewall, setShowFirewall] = useState(false);
  const [stripe, setStripe] = useState(null);
  const [loading, setLoading] = useState(false);

  let userTimezone = moment.tz.guess();

  if (userTimezone.includes("_")) {
    userTimezone = userTimezone.split("_").join(" ");
  }

  useEffect(() => {
    instanceStripe();
  }, []);

  const instanceStripe = async () => {
    setStripe(await stripePromise);
  };

  const onAttend = async () => {
    if (isAuthenticated) {
      if (updatedEvent.ticket === "premium") {
        if (!isEmpty(userProfile) && userProfile.memberShip === "premium") {
          const timezone = moment.tz.guess();
          addToMyEventList(updatedEvent, timezone);
          history.push(INTERNAL_LINKS.EVENTS);
        } else {
          setShowFirewall(true);
        }
      } else if (updatedEvent.ticket === "fee") {
        try {
          setLoading(true);
          let sessionData = await getCheckoutSession({
            prices: [
              {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: updatedEvent.title,
                  },
                  unit_amount: `${updatedEvent.ticketFee}00`,
                },
              },
            ],
            isPaidEvent: true,
            event: {
              ...updatedEvent,
              userTimezone,
            },
            callback_url: window.location.href,
          });

          stripe.redirectToCheckout({ sessionId: sessionData.data.id });
        } catch (error) {
          console.log(error);
        }
      } else {
        const timezone = moment.tz.guess();
        addToMyEventList(updatedEvent, timezone);
        history.push(INTERNAL_LINKS.EVENTS);
      }
    } else {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updatedEvent.description && updatedEvent.description.blocks) {
      setEditor("draft");
    } else {
      setEditor("froala");
    }
  }, [updatedEvent]);

  useEffect(() => {
    let isMounted = true;
    if (match.params.id) {
      setCanonicalUrl(
        `${process.env.REACT_APP_DOMAIN_URL}${INTERNAL_LINKS.PUBLIC_EVENT}/${match.params.id}`
      );
      getEvent(match.params.id, (error) => {
        if (isMounted && error) {
          history.push(INTERNAL_LINKS.NOT_FOUND);
        }
      });
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const planUpgrade = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  const onCancelModal = () => {
    setModalVisible(false);
  };

  const onClickDownloadCalendar = (day) => {
    const userTimezone = moment.tz.guess();

    window.open(
      `${process.env.REACT_APP_API_ENDPOINT}/public/event/ics/${updatedEvent.id}?day=${day}&userTimezone=${userTimezone}`,
      "_blank"
    );
  };

  const onClickAddGoogleCalendar = (startDate, endDate) => {
    let googleCalendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${updatedEvent.title}&dates=${startDate}/${endDate}&location=${updatedEvent.location}&trp=false&sprop=https://www.hackinghrlab.io/&sprop=name:`;

    window.open(googleCalendarUrl, "_blank");
  };

  const onClickAddYahooCalendar = (startDate, endDate) => {
    let yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&st=${startDate}&et=${endDate}&title=${updatedEvent.title}&in_loc=${updatedEvent.location}`;
    window.open(yahooCalendarUrl, "_blank");
  };

  const handleOnClick = ({ item, key, domEvent }) => {
    domEvent.stopPropagation();
    domEvent.preventDefault();

    const [startTime, endTime, day] = item.props.value;

    const { timezone } = updatedEvent;

    const convertedStartTime = convertToLocalTime(startTime, timezone).format(
      "YYYYMMDDTHHmmss"
    );

    const convertedEndTime = convertToLocalTime(endTime, timezone).format(
      "YYYYMMDDTHHmmss"
    );

    switch (key) {
      case "1":
        onClickDownloadCalendar(day);
        break;
      case "2":
        onClickAddGoogleCalendar(convertedStartTime, convertedEndTime);
        break;
      case "3":
        onClickAddYahooCalendar(convertedStartTime, convertedEndTime);
        break;
      default:
    }
  };

  const downloadDropdownOptions = (startTime, endTime, day) => {
    return (
      <Menu onClick={handleOnClick}>
        <Menu.Item key="1" value={[startTime, endTime, day]}>
          Download ICS File
        </Menu.Item>
        <Menu.Item key="2" value={[startTime, endTime]}>
          Add to Google Calendar
        </Menu.Item>
        <Menu.Item key="3" value={[startTime, endTime]}>
          Add to Yahoo Calendar
        </Menu.Item>
      </Menu>
    );
  };

  const displayVenueLocation = !isEmpty(updatedEvent.venueAddress) && (
    <div>
      <h5>
        Venue Address:{" "}
        <a
          href={`http://maps.google.com/maps?q=${encodeURI(
            updatedEvent.venueAddress.formatted_address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {updatedEvent.venueAddress.formatted_address}
        </a>
      </h5>
      <GoogleMap
        lat={updatedEvent.venueAddress.lat}
        lng={updatedEvent.venueAddress.lng}
      />
    </div>
  );

  const displayTransformedEventLocation = (updatedEvent.location || [])
    .map((location) => {
      if (location === "online") {
        return "Online";
      } else {
        return "In Person";
      }
    })
    .join("/");

  return (
    <div className="public-event-page">
      {showFirewall && (
        <div
          className="event-card-firewall"
          onClick={() => setShowFirewall(false)}
        >
          <div className="upgrade-notification-panel" onClick={planUpgrade}>
            <h3>
              This event requires a PREMIUM Membership to join. Click here to
              upgrate to a Premium Membership and get unlimited access to the
              LAB features.
            </h3>
          </div>
        </div>
      )}
      <Helmet>
        <title>{updatedEvent.title}</title>
        <meta name="description" content={updatedEvent.about} />
        <meta name="twitter:creator" />
        <meta
          name="twitter:image"
          content={updatedEvent.image || updatedEvent.image2}
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={updatedEvent.title} />
        <meta property="og:description" content={updatedEvent.about} />
        <meta
          property="og:image"
          content={updatedEvent.image || updatedEvent.image2}
        />
        <link rel="canonical" href={canonicalUrl} />
        <link
          rel="image_src"
          href={updatedEvent.image || updatedEvent.image2}
        />
      </Helmet>
      <div className="public-event-page-header">
        {!isEmpty(updatedEvent.images) && (
          <Carousel autoplay dots>
            {updatedEvent.images.map((image) => (
              <img src={image} alt="updatedEvent-img" key={image} />
            ))}
          </Carousel>
        )}
        {isEmpty(updatedEvent.images) &&
          !updatedEvent.image2 &&
          updatedEvent.image && (
            <img src={updatedEvent.image} alt="updatedEvent-img" />
          )}
        {isEmpty(updatedEvent.images) &&
          !updatedEvent.image &&
          updatedEvent.image2 && (
            <img src={updatedEvent.image2} alt="updatedEvent-img" />
          )}
        {isEmpty(updatedEvent.images) &&
          !updatedEvent.image &&
          !updatedEvent.image2 && (
            <div className="public-event-page-header-defaultimg" />
          )}
        <div className="public-event-page-header-title">
          <Modal
            visible={modalVisible}
            footer={null}
            width={400}
            bodyStyle={{ overflow: "auto", padding: "20px" }}
            className="modal-container-login"
            onCancel={onCancelModal}
          >
            <Login
              login={true}
              signUp={false}
              history={null}
              match={{ params: {} }}
              onClose={onCancelModal}
            />
          </Modal>
        </div>
      </div>
      <div className="public-event-page-content">
        <div className="public-event-page-content-calendar">
          {updatedEvent.status === "attend" && (
            <CustomButton
              text="REGISTER HERE"
              size={isMobile ? "md" : "lg"}
              type="primary"
              onClick={onAttend}
              loading={loading}
            />
          )}
          {updatedEvent.status === "going" && (
            <div
              className="going-label"
              style={{ marginRight: "1rem", color: "#00b574" }}
            >
              <CheckOutlined />
              <span>I'm going</span>
            </div>
          )}
          {updatedEvent.status === "going" && isAuthenticated && (
            <Space direction="vertical">
              {updatedEvent?.startAndEndTimes?.map((time, index) => {
                const startTime = convertToLocalTime(
                  time.startTime,
                  updatedEvent.timezone
                );
                const endTime = convertToLocalTime(
                  time?.endTime,
                  updatedEvent.timezone
                );

                return (
                  <div className="d-flex calendar" key={index}>
                    <Space
                      size="middle"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      {`${startTime.format("MMMM DD")} From ${startTime.format(
                        "HH:mm a"
                      )} to ${endTime.format("HH:mm a")} (${userTimezone})`}
                      <Dropdown
                        overlay={downloadDropdownOptions(
                          startTime,
                          endTime,
                          index
                        )}
                      >
                        <a
                          href="/#"
                          className="ant-dropdown-link"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Space>
                            {updatedEvent?.startAndEndTimes.length > 1
                              ? `Download Calendar Day ${index + 1}: ${moment(
                                  startTime
                                ).format("MMM DD")} `
                              : "Download Calendar"}
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                    </Space>
                  </div>
                );
              })}
            </Space>
          )}
        </div>
        <h1
          className={clsx("event-title", {
            "no-image": !updatedEvent.image2 && !updatedEvent.image,
          })}
        >
          {updatedEvent.title}
        </h1>
        <h3 className="event-date">
          {getEventPeriod(
            updatedEvent.startDate,
            updatedEvent.endDate,
            updatedEvent.timezone
          )}
        </h3>
        <h3 className="event-type">{displayTransformedEventLocation} Event</h3>
        {updatedEvent.ticket && (
          <h5 className="event-cost">
            Event tickets:
            <span>
              {updatedEvent.ticket === "fee"
                ? `$${updatedEvent.ticketFee} Registration fee`
                : updatedEvent.ticket === "premium"
                ? "Only PREMIUM members"
                : capitalizeWord(updatedEvent.ticket)}
            </span>
          </h5>
        )}

        <div className="event-types-container">
          <h5>Event Type:</h5>
          {updatedEvent.type &&
            updatedEvent.type.map((tp, index) => (
              <h5 className="event-types-title" key={index}>
                {capitalizeWord(tp)} {updatedEvent.type[index + 1] && `|`}
              </h5>
            ))}
        </div>

        <h5>Event Topics:</h5>
        {updatedEvent.categories && updatedEvent.categories.length > 0 && (
          <div className="event-topics">
            {updatedEvent.categories.map((tp, index) => (
              <SpecialtyItem key={index} title={tp} active={false} />
            ))}
          </div>
        )}
        {displayVenueLocation}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {updatedEvent.status === "attend" && (
            <CustomButton
              text="REGISTER HERE"
              size={isMobile ? "md" : "lg"}
              type="primary"
              onClick={onAttend}
              loading={loading}
            />
          )}
        </div>
      </div>

      {updatedEvent.description && (
        <div className="public-event-page-description">
          <h1 className="event-title">Description</h1>
          {editor === "froala" ? (
            <div
              className="event-description"
              dangerouslySetInnerHTML={{
                __html: (updatedEvent.description || {}).html || "",
              }}
            />
          ) : (
            <RichEdit data={updatedEvent.description} />
          )}
        </div>
      )}

      {updatedEvent.EventInstructors?.length > 0 && (
        <div className="public-event-page-instructors">
          <h1 className="event-title">SPEAKERS</h1>
          <div className="event-people">
            {updatedEvent.EventInstructors.map((eventInstructor) => {
              const instructor = eventInstructor.Instructor;

              return (
                <div className="event-instructor">
                  <Avatar
                    src={instructor.image}
                    alt="instructor-image"
                    size={128}
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "flex",
                    }}
                  />
                  <div className="event-instructor-name">{instructor.name}</div>
                  <Tooltip title={instructor.description}>
                    <div className="event-instructor-name truncate">
                      {instructor.description}
                    </div>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  updatedEvent: eventSelector(state).updatedEvent,
  isAuthenticated: authSelector(state).isAuthenticated,
  isMobile: envSelector(state).isMobile,
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  getEvent,
  addToMyEventList,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicEventPage);
