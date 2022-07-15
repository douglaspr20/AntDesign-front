import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Avatar, Dropdown, Menu, Space, Tooltip } from "antd";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";
import moment from "moment-timezone";
import { loadStripe } from "@stripe/stripe-js";

import { getCheckoutSession } from "api/module/stripe";

import { DateAvatar, CustomButton, CustomDrawer, RichEdit } from "components";
import { EVENT_TYPES, MONTH_NAMES } from "enum";
import Emitter from "services/emitter";
import {
  actions as eventActions,
  getChannelEvents,
  setEvent,
} from "redux/actions/event-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import {
  convertToLocalTime,
  convertToCertainTime,
  capitalizeWord,
} from "utils/format";

import "./style.scss";
import { channelSelector } from "redux/selectors/channelSelector";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

const EventDrawer = ({
  addToMyEventList,
  removeFromMyEventList,
  updatedEvent,
  visible,
  event,
  userProfile,
  onClose,
  filter,
  getChannelEvents,
  channel,
  onConfirmCredit,
}) => {
  const [editor, setEditor] = useState("froala");
  const [showFirewall, setShowFirewall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stripe, setStripe] = useState(null);
  const DataFormat = "YYYY.MM.DD hh:mm A";

  const onDrawerClose = () => {
    setShowFirewall(false);
    onClose();
  };

  useEffect(() => {
    instanceStripe();
  }, []);

  const instanceStripe = async () => {
    setStripe(await stripePromise);
  };

  const onAttend = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const userTimezone = moment.tz.guess();

    if (event.ticket === "premium") {
      if (userProfile && userProfile.memberShip === "premium") {
        addToMyEventList(event, userTimezone, () => {
          getChannelEvents({ ...filter, channel: channel.id });
        });
      } else {
        setShowFirewall(true);
      }
    } else if (event.ticket === "fee") {
      setLoading(true);

      let sessionData = await getCheckoutSession({
        prices: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: event.title,
              },
              unit_amount: `${event.ticketFee}00`,
            },
          },
        ],
        isPaidEvent: true,
        event: {
          ...event,
          userTimezone,
        },
        callback_url: window.location.href,
      });

      stripe.redirectToCheckout({ sessionId: sessionData.data.id });
    } else {
      addToMyEventList(event, userTimezone, () => {
        getChannelEvents({ ...filter, channel: channel.id });
      });
    }
    if (window.location.pathname.includes("channels")) {
      window.open(event.externalLink, "_blank");
    }
  };

  const onCancelAttend = () => {
    removeFromMyEventList(event);
  };

  // const onClickClaimDigitalCertificate = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   window.open(
  //     `${INTERNAL_LINKS.CERTIFICATE}/${this.props.data.id}`,
  //     "_blank"
  //   );
  // };

  const onClickConfirm = (e) => {
    Emitter.emit(EVENT_TYPES.OPEN_ATTENDANCE_DISCLAIMER, event);
  };

  const onClickClaimCredits = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onConfirmCredit(event);
  };

  const onClickDownloadCalendar = (day) => {
    const userTimezone = moment.tz.guess();

    window.open(
      `${process.env.REACT_APP_API_ENDPOINT}/public/event/ics/${event.id}?day=${day}&userTimezone=${userTimezone}`,
      "_blank"
    );
  };

  const onClickAddGoogleCalendar = (startDate, endDate) => {
    let googleCalendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${event.title}&dates=${startDate}/${endDate}&location=${event.location}&trp=false&sprop=https://www.hackinghrlab.io/&sprop=name:`;

    window.open(googleCalendarUrl, "_blank");
  };

  const onClickAddYahooCalendar = (startDate, endDate) => {
    let yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&st=${startDate}&et=${endDate}&title=${event.title}&in_loc=${event.location}`;
    window.open(yahooCalendarUrl, "_blank");
  };

  const handleOnClick = ({ item, key, domEvent }) => {
    domEvent.stopPropagation();
    domEvent.preventDefault();

    const [startTime, endTime, day] = item.props.value;

    const { timezone } = event;

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
      //
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

  const planUpgrade = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  useEffect(() => {
    if (event.description && event.description.blocks) {
      setEditor("draft");
    } else {
      setEditor("froala");
    }
  }, [event]);

  useEffect(() => {
    if (event && updatedEvent && event.id === updatedEvent.id) {
      setEvent({
        ...updatedEvent,
        day: moment(updatedEvent.date, DataFormat).date(),
        month: MONTH_NAMES[moment(updatedEvent.date, DataFormat).month()],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedEvent, event]);

  return (
    <CustomDrawer
      title={""}
      width={772}
      visible={visible}
      onClose={onDrawerClose}
    >
      <div className="event-details">
        {showFirewall && (
          <div
            className="event-details-firewall"
            onClick={() => setShowFirewall(false)}
          >
            <div className="upgrade-notification-panel" onClick={planUpgrade}>
              <h3>
                Upgrade to a PREMIUM Membership and get unlimited access to the
                LAB features
              </h3>
            </div>
          </div>
        )}
        <div className="event-details-header">
          {!isEmpty(event.images) && (
            <img src={event.images[0]} alt="event-img" />
          )}
          {isEmpty(event.images) && event.image2 && (
            <img src={event.image2} alt="event-img" />
          )}
          {isEmpty(event.images) && !event.image2 && event.image && (
            <img src={event.image} alt="event-img" />
          )}
        </div>
        <div className="event-details-content">
          <div className="event-details-content-actions">
            <DateAvatar day={event.day || 0} month={event.month || ""} />
            {event.status === "past" && (
              <div className="claim-buttons">
                <CustomButton
                  className="claim-digital-certificate"
                  text="Confirm I attended this event"
                  size="md"
                  type="primary outlined"
                  onClick={onClickConfirm}
                />
              </div>
            )}
            {event.status === "confirmed" && (
              <React.Fragment>
                {(userProfile || {}).memberShip === "premium" ? (
                  <React.Fragment>
                    {/* <CustomButton
                      className="claim-digital-certificate"
                      text="Claim digital certificate"
                      size="lg"
                      type="primary outlined"
                      onClick={onClickClaimDigitalCertificate}
                    /> */}
                    <CustomButton
                      text="Confirm I attended this event"
                      size="lg"
                      type="primary"
                      onClick={onClickClaimCredits}
                    />
                  </React.Fragment>
                ) : (
                  <CustomButton
                    text="Upgrade to PREMIUM"
                    size="md"
                    type="primary"
                    onClick={planUpgrade}
                  />
                )}
              </React.Fragment>
            )}
            {event.status === "attend" && (
              <CustomButton
                text="Attend"
                size="lg"
                type="primary"
                onClick={onAttend}
                loading={loading}
              />
            )}
            {event.status === "going" && (
              <React.Fragment>
                <div className="going-label">
                  <CheckOutlined />
                  <span>I'm going</span>
                </div>
                <CustomButton
                  className="not-going-btn"
                  text="Not going"
                  size="lg"
                  type="remove"
                  remove={true}
                  onClick={onCancelAttend}
                />
              </React.Fragment>
            )}
          </div>
          <h1 className="event-title">{event.title}</h1>
          <div className="d-flex items-center event-info">
            <h5 className="event-card-topic-title">
              {`Event date${event.startDate !== event.endDate ? "s" : ""}:`}
              <span>{event.period}</span>
            </h5>
            {/* <div className="d-flex items-center">
              <h3 className="event-date">{event.period}</h3>
            </div> */}
            {event.status === "going" && (
              <Space direction="vertical">
                {!isEmpty(event.startAndEndTimes) &&
                  event.startAndEndTimes?.map((time, index) => {
                    const startTime = convertToCertainTime(
                      time?.startTime,
                      event.timezone
                    );
                    const endTime = convertToCertainTime(
                      time?.endTime,
                      event?.timezone
                    );

                    return (
                      <Dropdown
                        key={time.startTime}
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
                          {event.startAndEndTimes.length > 1
                            ? `Download Calendar Day ${index + 1}: ${moment(
                                startTime
                              ).format("MMM DD")} `
                            : "Download Calendar"}
                          <DownOutlined />
                        </a>
                      </Dropdown>
                    );
                  })}
              </Space>
            )}
          </div>
          {event.location && (
            <>
              <h5 className="event-card-topic-title">
                Event Type:{" "}
                <span>
                  {event.location.map((loc, index) => {
                    if (loc === "online") {
                      return (
                        <>Online {event.location[index + 1] ? "and " : ""}</>
                      );
                    }

                    return (
                      <>In Person {event.location[index + 1] ? "and " : ""}</>
                    );
                  })}
                </span>
              </h5>
            </>
          )}
          {event.ticket && (
            <h5 className="event-card-topic-title">
              Event tickets:
              <span>
                {event.ticket === "fee"
                  ? `$${event.ticketFee} Registration fee`
                  : event.ticket === "premium"
                  ? "Only PREMIUM members"
                  : capitalizeWord(event.ticket)}
              </span>
            </h5>
          )}

          {event.type && (
            <h5 className="event-card-topic-title">
              Content delivery format:
              {event.type.map((tp, index) => (
                <span>
                  {capitalizeWord(tp)} {event.type[index + 1] && `|`}
                </span>
              ))}
            </h5>
          )}

          {event.categories && event.categories.length > 0 && (
            <h5 className="event-card-topic-title">
              Event topics:
              {event.categories.map((tp, index) => (
                <span>
                  {capitalizeWord(tp)} {event.categories[index + 1] && `|`}
                </span>
              ))}
            </h5>
          )}
        </div>

        {event.description && (
          <div className="event-details-description">
            <h1 className="event-title">Description</h1>
            {editor === "froala" ? (
              <div
                className="event-description"
                dangerouslySetInnerHTML={{
                  __html: (event.description || {}).html || "",
                }}
              />
            ) : (
              <RichEdit data={event.description} />
            )}
          </div>
        )}

        {event.EventInstructors?.length > 0 && (
          <div className="event-details-instructors">
            <h1 className="event-title">Speakers</h1>
            <div className="event-people">
              {event.EventInstructors.map((eventInstructor) => {
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
                    <div className="event-instructor-name">
                      {instructor.name}
                    </div>
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
    </CustomDrawer>
  );
};

EventDrawer.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  event: PropTypes.object,
  onClose: PropTypes.func,
  onConfirmCredit: PropTypes.func,
  filter: PropTypes.object,
};

EventDrawer.defaultProps = {
  title: "",
  visible: false,
  event: {},
  onClose: () => {},
  onConfirmCredit: () => {},
  filter: {},
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
  updatedEvent: eventSelector(state).updatedEvent,
  channel: channelSelector(state).selectedChannel,
});

const mapDispatchToProps = {
  getChannelEvents,
  ...eventActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDrawer);
