import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import Helmet from "react-helmet";
import { CheckOutlined } from "@ant-design/icons";
import { Modal } from "antd";

import { CustomButton, SpecialtyItem, RichEdit } from "components";
import Login from "pages/Login";
import { getEvent, addToMyEventList } from "redux/actions/event-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import { authSelector } from "redux/selectors/authSelector";
import { envSelector } from "redux/selectors/envSelector";
import { INTERNAL_LINKS } from "enum";

import "./style.scss";

const PublicEventPage = ({
  match,
  updatedEvent,
  isAuthenticated,
  isMobile,
  getEvent,
  addToMyEventList,
  history,
}) => {
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editor, setEditor] = useState("froala");

  const onAttend = () => {
    if (isAuthenticated) {
      addToMyEventList(updatedEvent);
      history.push(INTERNAL_LINKS.EVENTS);
    } else {
      setModalVisible(true);
    }
  };

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

  const onCancelModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="public-event-page">
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
        {updatedEvent.image2 && (
          <img src={updatedEvent.image2} alt="updatedEvent-img" />
        )}
        {!updatedEvent.image2 && updatedEvent.image && (
          <img src={updatedEvent.image} alt="event-img" />
        )}
        {!updatedEvent.image2 && !updatedEvent.image && (
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
          {updatedEvent.status === "attend" && (
            <CustomButton
              text="REGISTER HERE"
              size={isMobile ? "md" : "lg"}
              type="primary"
              onClick={onAttend}
            />
          )}
          {updatedEvent.status === "going" && (
            <div className="going-label">
              <CheckOutlined />
              <span>I'm going</span>
            </div>
          )}
        </div>
      </div>
      <div className="public-event-page-content">
        <h1
          className={clsx("event-title", {
            "no-image": !updatedEvent.image2 && !updatedEvent.image,
          })}
        >
          {updatedEvent.title}
        </h1>
        <h3 className="event-date">{updatedEvent.period}</h3>
        <h3 className="event-type">{`${(updatedEvent.location || []).join(
          ", "
        )} event`}</h3>
        <h3 className="event-cost">{updatedEvent.ticket}</h3>

        <h5>Event Type:</h5>
        {updatedEvent.type && updatedEvent.type.length > 0 && (
          <div className="event-topics">
            {updatedEvent.type.map((tp, index) => (
              <SpecialtyItem key={index} title={tp} active={false} />
            ))}
          </div>
        )}
        <h5>Event Topics:</h5>
        {updatedEvent.categories && updatedEvent.categories.length > 0 && (
          <div className="event-topics">
            {updatedEvent.categories.map((tp, index) => (
              <SpecialtyItem key={index} title={tp} active={false} />
            ))}
          </div>
        )}
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  updatedEvent: eventSelector(state).updatedEvent,
  isAuthenticated: authSelector(state).isAuthenticated,
  isMobile: envSelector(state).isMobile,
});

const mapDispatchToProps = {
  getEvent,
  addToMyEventList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicEventPage);
