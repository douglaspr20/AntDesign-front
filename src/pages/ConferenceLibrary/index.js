import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, notification } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { isEmpty } from "lodash";

import ConferenceLibraryFilterDrawer from "./ConferenceLibraryFilterDrawer";
import {
  AnnualConferenceCard,
  ConferenceCard,
  CustomButton,
  Tabs,
} from "components";
import ConferenceLibraryFilterPanel from "containers/ConferenceLibraryFilterPanel";
import { INTERNAL_LINKS, SETTINGS } from "enum";
import { setLoading } from "redux/actions/home-actions";
import {
  getAllSessions,
  getSessionsUserJoined,
} from "redux/actions/session-actions";
import {
  getMoreConferenceLibraries,
  searchConferenceLibraries,
} from "redux/actions/conference-actions";
import {
  getAdvertisementsTodayByPage,
  getAdvertisementById,
} from "redux/actions/advertisment-actions";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { advertisementSelector } from "redux/selectors/advertisementsSelector";
import { conferenceSelector } from "redux/selectors/conferenceSelector";

import IconLoadingMore from "images/icon-loading-more.gif";

import "./style.scss";
import Certificate from "pages/GlobalConference/Certificate";
import jsPDF from "jspdf";
import { formatAnnualConference } from "utils/formatPdf";

const ConferenceLibrary = ({
  loading,
  allConferenceLibraries,
  getMoreConferenceLibraries,
  searchConferenceLibraries,
  getAdvertisementsTodayByPage,
  getAdvertisementById,
  advertisementsByPage,
  advertisementById,
  isAdPreview = false,
  getAllSessions,
  getSessionsUserJoined,
  sessionsUserJoined,
  allSessions,
  userProfile,
  setLoading,
}) => {
  const [filters, setFilters] = useState({});
  const [visible, setVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState("0");
  const [meta, setMeta] = useState("");
  const [listOfYears, setListOfYears] = useState([2020]);
  const [modalVisibleCertificate, setModalVisibleCertificate] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (isAdPreview) {
      getAdvertisementById(id);
    } else {
      getAdvertisementsTodayByPage("conference-library");
    }

    getAllSessions({ type: "conference" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (userProfile?.sessionsJoined?.length > 0) {
      getSessionsUserJoined(userProfile.sessionsJoined);
    }
  }, [getSessionsUserJoined, userProfile]);

  const displayAds = !isEmpty(advertisementsByPage["conference-library"]) && (
    <div className="conference-library-advertisement-wrapper">
      {advertisementsByPage["conference-library"].map((advertisement) => {
        return (
          <div
            className="conference-library-advertisement-wrapper-content"
            key={advertisement.id}
          >
            <div
              className="advertisement"
              onClick={() =>
                window.open(advertisement.advertisementLink, "_blank")
              }
            >
              <img
                src={advertisement.adContentLink}
                alt="advertisement"
                className="advertisement-img"
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const displayPreviewAd = isAdPreview && (
    <div className="conference-library-advertisement-wrapper-preview">
      <div className="advertisement">
        <img
          src={advertisementById.adContentLink}
          alt="advertisement"
          className="advertisement-img"
        />
      </div>
    </div>
  );

  const onShowMore = () => {
    getMoreConferenceLibraries(
      {
        ...filters,
        page: allConferenceLibraries?.[+currentTab].currentPage + 1,
        meta,
      },
      [listOfYears[+currentTab]],
      +currentTab
    );
  };

  const onFilterChange = (filters) => {
    searchConferenceLibraries(
      {
        ...filters,
        meta,
      },
      listOfYears
    );
    setFilters(filters);
  };

  const onSearch = (value) => {
    searchConferenceLibraries(
      {
        ...filters,
        meta: value,
      },
      listOfYears
    );
    setMeta(value);
  };

  const downloadPdf = async (option) => {
    setLoading(true);
    if (sessionsUserJoined.length < 1) {
      setLoading(false);
      return notification.warning({
        message: "You haven't joined any session",
        description: `The participation report is only available to those who joined at least one session during the Global Conference 2022.`,
      });
    }

    const template = formatAnnualConference(
      userProfile,
      sessionsUserJoined,
      option
    );

    const pdf = new jsPDF({
      orientation: "p",
      format: "a4",
      unit: "px",
      hotfixes: ["px_scaling"],
      precision: 32,
    });

    await pdf.html(template);
    pdf.save(
      option === "personal-agenda"
        ? "Personalizated Agenda.pdf"
        : option === "conference-schedule"
        ? "Conference Schedule.pdf"
        : "Personalized Participation Report.pdf"
    );

    setLoading(false);
  };

  useEffect(() => {
    const getListOfYears = (startYear) => {
      const currentYear = new Date().getFullYear();
      const years = [];

      while (startYear <= currentYear) {
        years.push(startYear++);
      }

      return years;
    };

    const listOfYears = getListOfYears(2020);
    setListOfYears(listOfYears.reverse());
    searchConferenceLibraries({}, listOfYears);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setCountOfResults(allConferenceLibraries[+currentTab]?.count || 0);

  //   // eslint-disable-next-line
  // }, [currentTab, allConferenceLibraries]);

  const displayData = (index) => {
    const libraries = allConferenceLibraries[index]?.rows || [];

    return libraries.map((item, indx) => {
      let frequency = 0;

      if (item.meta && meta) {
        frequency = [...item.meta.toLowerCase().matchAll(meta)].length;
      }

      return (
        <ConferenceCard
          listOfYearsIndex={index}
          key={indx}
          data={item}
          keyword={meta}
          frequency={frequency}
        />
      );
    });
  };

  const onWatch = (id) => {
    history.push(`${INTERNAL_LINKS.MICRO_CONFERENCE}/${id}`);
  };

  const TabData =
    listOfYears?.map((year, index) => {
      return {
        title: year,
        content: () => (
          <>
            {year === 2022 ? (
              <>
                <CustomButton
                  size="xs"
                  text="Download Certificate"
                  style={{
                    marginTop: "12px",
                    padding: "0px 46px",
                  }}
                  onClick={() => {
                    setModalVisibleCertificate(true);
                  }}
                />
                <CustomButton
                  size="xs"
                  text="Download Participation Report"
                  className="button-participation-report"
                  onClick={() => {
                    downloadPdf("report-sessions-joined");
                  }}
                  style={{ marginLeft: "10px" }}
                />

                <div>
                  {allSessions.map((session) => (
                    <AnnualConferenceCard
                      key={session.id}
                      session={session}
                      typeConference="conference-library"
                      onWatch={() => onWatch(session.id)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="search-results-list">{displayData(index)}</div>
            )}
          </>
        ),
      };
    }) || [];

  return (
    <div className="conference-library-page">
      <ConferenceLibraryFilterPanel
        onChange={onFilterChange}
        onSearch={onSearch}
      />
      <ConferenceLibraryFilterDrawer
        visible={visible}
        onClose={() => setVisible(false)}
        onChange={onFilterChange}
        onSearch={setMeta}
      />
      <div className="search-results-container">
        <Row>
          <Col span={24}>
            <div className="search-results-container-mobile-header">
              <h3 className="filters-btn" onClick={() => setVisible(true)}>
                Filters
              </h3>
            </div>
          </Col>
        </Row>
        <div className="conference-library-content">
          <div style={{ width: "100%" }}>
            <Tabs
              data={TabData}
              current={currentTab}
              onChange={setCurrentTab}
            />
            {allConferenceLibraries[+currentTab]?.currentPage *
              SETTINGS.MAX_SEARCH_ROW_NUM <
              allConferenceLibraries[+currentTab]?.count && (
              <div className="conference-library-footer d-flex justify-center items-center">
                {loading && (
                  <div className="conference-library-page-loading-more">
                    <img src={IconLoadingMore} alt="loading-more-img" />
                  </div>
                )}
                {!loading && (
                  <CustomButton
                    text="Show more"
                    type="primary outlined"
                    size="lg"
                    onClick={onShowMore}
                  />
                )}
              </div>
            )}
          </div>
          {displayAds}
          {displayPreviewAd}
        </div>
      </div>

      <Certificate
        visible={modalVisibleCertificate}
        onCancel={() => setModalVisibleCertificate(false)}
        sessionsUserJoined={sessionsUserJoined}
      />
    </div>
  );
};

ConferenceLibrary.propTypes = {
  title: PropTypes.string,
};

ConferenceLibrary.defaultProps = {
  title: "",
};

const mapStateToProps = (state, props) => ({
  loading: conferenceSelector(state).loading,
  allConferenceLibraries: conferenceSelector(state).allConferenceLibraries,
  allSessions: sessionSelector(state).allSessions,
  sessionsUserJoined: sessionSelector(state).sessionsUserJoined,
  countOfResults: conferenceSelector(state).countOfResults,
  currentPage: conferenceSelector(state).currentPage,
  userProfile: homeSelector(state).userProfile,
  ...advertisementSelector(state),
});

const mapDispatchToProps = {
  getMoreConferenceLibraries,
  searchConferenceLibraries,
  getAdvertisementsTodayByPage,
  getAdvertisementById,
  getSessionsUserJoined,
  getAllSessions,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceLibrary);
