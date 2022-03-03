import moment from "moment";
import { convertToCertainTime } from "utils/format";
import LogoHackingHR from "images/img-hhr-logo.png";
import { TIMEZONE_LIST } from "enum";

const formatAnnualConference = (userProfile, sessions, option) => {
  const sessionsOrdered = sessions
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
        period: `From ${sTime.format("h:mm a")} to ${eTime.format("h:mm a")}`,
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

  const sData = [];

  for (let i = 0; i < sessionsOrdered.length; i++) {
    let isEmpty = true;
    for (let j = 0; j < sData.length; j++) {
      if (
        moment(sessionsOrdered[i]?.startTime).format("MMMM D") ===
        sData[j].period
      ) {
        sData[j].data.push(sessionsOrdered[i]);
        isEmpty = false;
      }
    }

    if (isEmpty) {
      sData.push({
        period: moment(sessionsOrdered[i].startTime).format("MMMM D"),
        data: [sessionsOrdered[i]],
      });
    }
  }

  const template = document.createElement("div");
  template.setAttribute("id", "template-agenda");

  template.style =
    "width: 800px; height: auto; display: flex; flex-direction: column;align-items: center";

  let content = `<div style="height: 1000px; width: 100%; display: flex; flex-direction: column; 
    align-items: center; justify-content: center; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 160px">
    <img src=${LogoHackingHR} style="width: 250px; height: 250px">
    <p style="font-weight: 800 !important; font-size: 3.5rem !important; text-align: center">2022</p>
    <p style="font-weight: 800 !important; font-size: 3.5rem !important; text-align: center; padding: 0px 150px">HR Innovation
    and Future of
    Work</p>
    <span style="font-weight: 800 !important; font-size: 1.5rem !important; text-align: center">Global Online Conference and Workshop </span>
    </div>
    
    <div style="height: 950px; width: 90%; display: flex; flex-direction: column; 
    align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 150px">
      <p style="font-size: 1.3rem">${
        option === "personal-agenda"
          ? "Personalized Agenda – Created on"
          : option === "conference-schedule"
          ? "Conference Schedule - Generated on"
          : "Personalized Participation Report - generated on"
      } ${moment().format("MM-DD-YYYY")} </p>
      <p style="font-size: 1.3rem">DOWNLOAD</p>
      <p style="font-size: 1.3rem">${userProfile.firstName} ${
    userProfile.lastName
  }</p>
    </div>

    <div style="height: 950px; width: 90%; display: flex; flex-direction: column; 
    align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
        <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 15px 10px 0px">
          <img src=${LogoHackingHR} style="width: 70px; height: 70px">
          <div>
            <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
            <p style="margin-top: -20px">Global Online Conference | ${
              option === "personal-agenda"
                ? "Personalized Agenda"
                : option === "conference-schedule"
                ? "Conference Schedule"
                : "Report sessions Joined"
            }</p>
          </div>
        </div>

        <div>
          <p style="font-weight: 800 !important; font-size: 2.5rem !important; text-align: center">Event Overview</p>
          <p style="font-size: 1.5rem; padding: 0px 2.5rem">
          This is ${option !== "conference-schedule" ? "your" : ""} ${
    option === "personal-agenda"
      ? "personalized agenda"
      : option === "conference-schedule"
      ? "Conference Schedule"
      : "report sessions joined"
  }. It includes
    ${
      option === "conference-schedule"
        ? "all sessions of Global Conference"
        : `
      the sessions 
          you ${
            option === "personal-agenda" ? "are planning to join" : "joined"
          }. 
          <br>
          <br>
          ${
            option === "personal-agenda"
              ? `  You can update your personalized agenda at any time 
          you want. Also, during conference weeki, you can join a 
          different session than the original one you added in your 
          personalized agenda. However, notice that during 
          conference week, once you click on “join” a session, you 
          won’t be able to join any other session happening at the 
          same time. 
          <br>
          <br>
          Regarding the HR certification credits: 1) you MUST be a 
          PREMIUM member in the Hacking HR LAB (click on 
          UPGRADE to become premium). There are no exceptions; 
          2) the codes will be sent to you two weeks after the 
          conference. We will ONLY send you the codes of the 
          sessions you actually JOINED; and 3) you can watch the 
          recordings later and still earn HR certification credits. 
          Thank you and enjoy! `
              : ""
          }
      `
    }  
          </p>
        </div>
    </div>

    </div>
    `;

  for (const day of sData) {
    let conferences = "";

    for (let i = 0; i < day.data.length; i++) {
      let categorieHTML = "";

      for (const categorie of day.data[i].categories) {
        categorieHTML += `    
          <div style="
          height: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
          border-radius: 0.25rem;
          border: 1px solid #438cef;;
          color: #438cef;
          max-width: 200px;
          overflow: hidden;">
          <span style="overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;">${categorie}</span>
         
          </div>`;
      }

      if (
        i % 2 === 0 &&
        day.data[i + 1] &&
        day.data[i].description?.length < 300
      ) {
        conferences += `
        <div style="background: #fff; 
        border: 1px solid #cfd3d6; 
        box-shadow: 4px 0px 14px #37215714; 
        border-radius: 0.5rem;
        opacity: 1;
        margin-top: -40px;
        padding: 2rem; margin-bottom: 30px;" class="conference">
             <div style="display: flex; flex-direction: column; flex-wrap: wrap">
                <h2 style="color: rgba(0, 0, 0, 0.85); font-weight: 500;">${
                  day.data[i].title
                }</h2>
                <span style="font-size: 14px; line-height: 19px; color: #697077;">Session type: ${
                  day.data[i].type
                }</span>
                <span style="font-size: 14px; line-height: 19px; color: #697077; margin: 0.5rem 0">${
                  day.data[i].date
                }</span>
                <span style="font-size: 14px; line-height: 19px; color: #697077; margin: 0.5rem 0">
                ${day.data[i].period} ${day.data[i].tz}
                </span>
    
                  <div style="  
                  display: flex;
                  width: 70%;
                  flex-wrap: wrap;
                  margin-top: 1rem;"
                  >
                  ${categorieHTML}
                  </div>
  
                  <div style="display: flex;
                  flex-direction: column;
                  padding-top: 1rem;
                  margin-top: 1rem;
                  border-top: 1px solid #e1e2ee">
  
                  <h4>Description</h4>
                  <p>
                  <p style="white-space: pre-line;">${
                    day.data[i].description
                  }<p>
                  </p>
  
                  </div>
             </div>
          </div>
          ${
            option === "report-sessions-joined" &&
            day.data[i].type === "Certificate Track and Panels"
              ? `
          <div style="margin-top: -25px;">
          <h3>HR Recertification Credits</h3>
          <p style="white-space: pre-line;"> ${
            userProfile.memberShip === "premium" &&
            option === "report-sessions-joined"
              ? day.data[i].recertification_credits
              : "HR Recertification Credits: Only available to PREMIUM"
          }</p>
          </div>
          `
              : ""
          }
        `;
      } else if (i % 2 !== 0 && day.data[i].description?.length < 300) {
        conferences += `
        <div style="background: #fff; border: 1px solid #cfd3d6; box-shadow: 4px 0px 14px #37215714; 
        border-radius: 0.5rem;
        opacity: 1;
        padding: 2rem; margin-bottom: 50px">
             <div style="display: flex; flex-direction: column; flex-wrap: wrap">
                <h2 style="color: rgba(0, 0, 0, 0.85); font-weight: 500;">${
                  day.data[i].title
                }</h2>
                <span style="font-size: 14px; line-height: 19px; color: #697077;">Session type: ${
                  day.data[i].type
                }</span>
                <span style="font-size: 14px; line-height: 19px; color: #697077; margin: 0.5rem 0">${
                  day.data[i].date
                }</span>
                <span style="font-size: 14px; line-height: 19px; color: #697077; margin: 0.5rem 0">
                ${day.data[i].period} ${day.data[i].tz}
                </span>
    
                  <div style="  
                  display: flex;
                  width: 70%;
                  flex-wrap: wrap;
                  margin-top: 1rem;"
                  >
                  ${categorieHTML}
                  </div>
  
                  <div style="display: flex;
                  flex-direction: column;
                  padding-top: 1rem;
                  margin-top: 1rem;
                  border-top: 1px solid #e1e2ee">
  
                  <h4>Description</h4>
                  <p>
                  <p>${day.data[i].description}<p>
                  </p>
  
                  </div>
             </div>
          </div>
          ${
            option === "report-sessions-joined" &&
            day.data[i].type === "Certificate Track and Panels"
              ? `
          <div style="margin-top: -35px;">
          <h3>HR Recertification Credits</h3>
          <p style="white-space: pre-line;"> ${
            userProfile.memberShip === "premium" &&
            option === "report-sessions-joined"
              ? day.data[i].recertification_credits
              : "HR Recertification Credits: Only available to PREMIUM"
          }</p>
          </div>
          `
              : ""
          }
       
        `;

        content += `
        <div style="height: 950px; width: 90%; display: flex; flex-direction: column;
            align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
            <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 10px 10px 0px">
              <img src=${LogoHackingHR} style="width: 70px; height: 70px">
              <div>
                <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
                <p style="margin-top: -20px">Global Online Conference | ${
                  option === "personal-agenda"
                    ? "Personalized Agenda"
                    : option === "conference-schedule"
                    ? "Conference Schedule"
                    : "Reported sessions joined"
                } </p>
              </div>
            </div>

               <p style="align-self: flex-start;font-weight: 800 !important; font-size: 2.5rem !important; margin-left: 40px">
               ${day.period}
               </p>

            <div style="width: 100%"> ${conferences}</div>
            </div>
            `;
        conferences = "";
      } else if (i % 2 !== 0 && day.data[i].description?.length > 300) {
        content += `
        <div style="height: 950px; width: 90%; display: flex; flex-direction: column;
            align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
            <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 10px 10px 0px">
              <img src=${LogoHackingHR} style="width: 70px; height: 70px">
              <div>
                <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
                <p style="margin-top: -20px">Global Online Conference | ${
                  option === "personal-agenda"
                    ? "Personalized Agenda"
                    : option === "conference-schedule"
                    ? "Conference Schedule"
                    : "Reported sessions joined"
                }</p>
              </div>
            </div>

               <p style="align-self: flex-start;font-weight: 800 !important; font-size: 2.5rem !important; margin-left: 40px">
               ${day.period}
               </p>

            <div style="width: 100%"> ${conferences}</div>
            </div>
            `;

        conferences = "";

        conferences += `
        <div style="background: #fff; border: 1px solid #cfd3d6; box-shadow: 4px 0px 14px #37215714; 
        border-radius: 0.5rem;
        opacity: 1;
        padding: 2rem; margin-bottom: 50px">
             <div style="display: flex; flex-direction: column; flex-wrap: wrap">
                <h2 style="color: rgba(0, 0, 0, 0.85); font-weight: 500;">${
                  day.data[i].title
                }</h2>
                <span style="font-size: 14px; line-height: 19px; color: #697077;">Session type: ${
                  day.data[i].type
                }</span>
                <span style="font-size: 14px; line-height: 19px; color: #697077; margin: 0.5rem 0">${
                  day.data[i].date
                }</span>
                <span style="font-size: 14px; line-height: 19px; color: #697077; margin: 0.5rem 0">
                ${day.data[i].period} ${day.data[i].tz}
                </span>
    
                  <div style="  
                  display: flex;
                  width: 70%;
                  flex-wrap: wrap;
                  margin-top: 1rem;"
                  >
                  ${categorieHTML}
                  </div>
  
                  <div style="display: flex;
                  flex-direction: column;
                  padding-top: 1rem;
                  margin-top: 1rem;
                  border-top: 1px solid #e1e2ee">
  
                  <h4>Description</h4>
                  <p>
                  <p>${day.data[i].description}<p>
                  </p>
  
                  </div>
             </div>
          </div>
          ${
            option === "report-sessions-joined" &&
            day.data[i].type === "Certificate Track and Panels"
              ? `
          <div>
          <h3>HR Recertification Credits</h3>
          <p style="white-space: pre-line;"> ${
            userProfile.memberShip === "premium" &&
            option === "report-sessions-joined"
              ? day.data[i].recertification_credits
              : "HR Recertification Credits: Only available to PREMIUM"
          }</p>
          </div>
          `
              : ""
          }
       
        `;

        content += `
        <div style="height: 950px; width: 90%; display: flex; flex-direction: column;
            align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
            <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 10px 10px 0px">
              <img src=${LogoHackingHR} style="width: 70px; height: 70px">
              <div>
                <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
                <p style="margin-top: -20px">Global Online Conference | ${
                  option === "personal-agenda"
                    ? "Personalized Agenda"
                    : option === "conference-schedule"
                    ? "Conference Schedule"
                    : "Reported sessions joined"
                }</p>
              </div>
            </div>

               <p style="align-self: flex-start;font-weight: 800 !important; font-size: 2.5rem !important; margin-left: 40px">
               ${day.period}
               </p>

            <div style="width: 100%"> ${conferences}</div>
            </div>
            `;

        conferences = "";
      } else {
        conferences += `
        <div style="background: #fff; border: 1px solid #cfd3d6; box-shadow: 4px 0px 14px #37215714; 
        border-radius: 0.5rem;
        opacity: 1;
        padding: 2rem; margin-bottom: 50px">
             <div style="display: flex; flex-direction: column; flex-wrap: wrap">
                <h2 style="color: rgba(0, 0, 0, 0.85); font-weight: 500;">${
                  day.data[i].title
                }</h2>
                <span style="font-size: 14px; line-height: 19px; color: #697077;">Session type: ${
                  day.data[i].type
                }</span>
                <span style="font-size: 14px; line-height: 19px; color: #697077; margin: 0.5rem 0">${
                  day.data[i].date
                }</span>
                <span style="font-size: 14px; line-height: 19px; color: #697077; margin: 0.5rem 0">
                ${day.data[i].period} ${day.data[i].tz}
                </span>
    
                  <div style="  
                  display: flex;
                  width: 70%;
                  flex-wrap: wrap;
                  margin-top: 1rem;"
                  >
                  ${categorieHTML}
                  </div>
  
                  <div style="display: flex;
                  flex-direction: column;
                  padding-top: 1rem;
                  margin-top: 1rem;
                  border-top: 1px solid #e1e2ee">
  
                  <h4>Description</h4>
              
                  <p>${
                    day.data[i].description !== null
                      ? day.data[i].description
                      : ""
                  }<p>
                
  
                  </div>
             </div>
          </div>
          ${
            option === "report-sessions-joined" &&
            day.data[i].type === "Certificate Track and Panels"
              ? `
          <div>
          <h3>HR Recertification Credits</h3>
          <p style="white-space: pre-line;"> ${
            userProfile.memberShip === "premium" &&
            option === "report-sessions-joined"
              ? day.data[i].recertification_credits
              : "HR Recertification Credits: Only available to PREMIUM"
          }</p>
          </div>
          `
              : ""
          }
       
        `;
        content += `  
        <div style="height: 950px; width: 90%; display: flex; flex-direction: column; 
            align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
            <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 10px 10px 0px">
              <img src=${LogoHackingHR} style="width: 70px; height: 70px">
              <div>
                <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
                <p style="margin-top: -20px">Global Online Conference | ${
                  option === "personal-agenda"
                    ? "Personalized Agenda"
                    : option === "conference-schedule"
                    ? "Conference Schedule"
                    : "Reported sessions joined"
                }</p>
              </div>
            </div>
    
               <p style="align-self: flex-start;font-weight: 800 !important; font-size: 2.5rem !important; margin-left: 40px">
               ${day.period}
               </p>
    
            <div style="width: 100%"> ${conferences}</div>
            </div>
            `;
        conferences = "";
      }
    }
  }

  if (option === "personal-agenda" || option === "report-sessions-joined") {
    content += `
    <div style="height: 950px; width: 90%; display: flex; flex-direction: column;
    align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
    <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 10px 10px 0px">
      <img src=${LogoHackingHR} style="width: 70px; height: 70px">
      <div>
        <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
        <p style="margin-top: -20px">Global Online Conference | ${
          option === "personal-agenda"
            ? "Personalized Agenda"
            : option === "conference-schedule"
            ? "Conference Schedule"
            : "Reported sessions joined"
        } </p>
      </div>
    </div>
    <div style="margin-top: 1rem; width: 800px; padding: 0px 40px; margin-bottom: 160px">
    <p
    style="width: 100%; text-align: center;"
    >
      SUGGESTED LINKS TO CHECK OUT (BY SPEAKERS)
    </p>

    <div
    style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
      <p>Alysha Campbell</p>
      <a href="www.cultureshifthr.com">www.cultureshifthr.com</a>
      <a href="www.alyshacampbell.com">www.alyshacampbell.com</a>
      <a href="www.amazon.com/Building-Beyond-Inspirational-Lessons-Successful/dp/B09JVKRPG1/ref=sr_1_1?crid=3W2JLS5KCRMU4&keywords=building+beyond+the+9+to+5+book+alysha+campbell&qid=1645714503&sprefix=building+beyond+the+9+to+5+book+alysha+campbell%2Caps%2C79&sr=8-1">
        www.amazon.com/Building-Beyond-Inspirational-Lessons-Successful
      </a>
    </div>

    <div
    style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
      <p>Alyssa Dver</p>

      <a href="https://www.americanconfidenceinstitute.com/selfcheck">
        www.americanconfidenceinstitute.com/selfcheck
      </a>
      <a href="https://www.americanconfidenceinstitute.com/podcasts/real-confidence">
        www.americanconfidenceinstitute.com/podcasts/real-confidence
      </a>
      <a href="https://www.ted.com/talks/alyssa_dver_confidence_is_a_choice_real_science_superhero_impact">
        www.ted.com/talks/alyssa_dver_confidence_is_a_choice_real_science_superhero_impact
      </a>
    </div>

    <div
    style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
      <p>Andrea DiMatteo</p>

      <a href="https://themoxieexchange.com/blog/2021-meta-data-report-breakdonw/">
        themoxieexchange.com/blog/2021-meta-data-report-breakdonw
      </a>
      <a href="https://themoxieexchange.com/resources/">
        themoxieexchange.com/resources
      </a>
      <a href="https://www.ted.com/talks/alyssa_dver_confidence_is_a_choice_real_science_superhero_impact">
        www.ted.com/talks/alyssa_dver_confidence_is_a_choice_real_science_superhero_impact
      </a>
    </div>

    <div
    style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
      <p>Andrew Bartlow</p>

      <a href="https://www.peopleleaderaccelerator.com/">
        www.peopleleaderaccelerator.com
      </a>
      <a href="https://www.seriesbconsulting.com/">
        www.seriesbconsulting.com
      </a>
      <a href="https://www.scalingforsuccessbook.com/">
        www.scalingforsuccessbook.com
      </a>
    </div>

    <div
    style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
      <p>Angela Champ</p>

      <a href="https://www.angelachamp.com/">www.angelachamp.com</a>
      <a href="https://www.amazon.com/gp/product/0228840589?pf_rd_r=P12JTTRSK2CZGCVSW387&pf_rd_p=6fc81c8c-2a38-41c6-a68a-f78c79e7253f&pd_rd_r=531e8b5a-37e7-44bc-b403-897a8db6ce2b&pd_rd_w=34MJ3&pd_rd_wg=ei2fw&ref_=pd_gw_unk">
        www.amazon.com/gp/product/0228840589
      </a>
      <a href="https://www.amazon.com/Depends-Employee-Relations-Resources-Professionals/dp/1773700707/ref=sr_1_1?crid=4QJ0N6N6Z08Z&keywords=it+depends+employee+relations+case+studies&qid=1645979048&s=books&sprefix=it+depends+employee+relations+case+studies%2Cstripbooks-intl-ship%2C123&sr=1-1">
        www.amazon.com/Depends-Employee-Relations-Resources-Professionals
      </a>
    </div>
    

    <div
    style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
      <p>Angela Champ</p>

      <a href="https://www.angelachamp.com/">www.angelachamp.com</a>
      <a href="https://www.amazon.com/gp/product/0228840589?pf_rd_r=P12JTTRSK2CZGCVSW387&pf_rd_p=6fc81c8c-2a38-41c6-a68a-f78c79e7253f&pd_rd_r=531e8b5a-37e7-44bc-b403-897a8db6ce2b&pd_rd_w=34MJ3&pd_rd_wg=ei2fw&ref_=pd_gw_unk">
        www.amazon.com/gp/product/0228840589
      </a>
      <a href="https://www.amazon.com/Depends-Employee-Relations-Resources-Professionals/dp/1773700707/ref=sr_1_1?crid=4QJ0N6N6Z08Z&keywords=it+depends+employee+relations+case+studies&qid=1645979048&s=books&sprefix=it+depends+employee+relations+case+studies%2Cstripbooks-intl-ship%2C123&sr=1-1">
        www.amazon.com/Depends-Employee-Relations-Resources-Professionals
      </a>
    </div>

    <div
    style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
      <p>Angela Heyroth</p>

      <a href="www.talentlifecycledesigns.com">www.talentlifecycledesigns.com</a>
    </div>
  </div>
</div>

<div style="height: 950px; width: 90%; display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
  <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 10px 10px 0px">
    <img src=${LogoHackingHR} style="width: 70px; height: 70px">
    <div>
      <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
      <p style="margin-top: -20px">Global Online Conference | ${
        option === "personal-agenda"
          ? "Personalized Agenda"
          : option === "conference-schedule"
          ? "Conference Schedule"
          : "Reported sessions joined"
      } </p>
    </div>
  </div>
  <div style="margin-top: 1rem; width: 800px; padding: 0px 40px; margin-bottom: 160px">
  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Anna Tavis, Ph.D</p>

    <a href="https://www.amazon.com/Humans-Work-Practice-Creating-Workplace/dp/1398604232">
      www.amazon.com/Humans-Work-Practice-Creating-Workplace
    </a>
    <a href="https://www.linkedin.com/newsletters/humans-at-work-6859651747649073152/">
    www.linkedin.com/newsletters
    </a>
    <a href="https://www.sps.nyu.edu/homepage/academics/faculty-directory/13205-anna-a-tavis.html">
    www.sps.nyu.edu/homepage
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Anne Jacoby</p>

    <a href="https://www.springstreetco.com/creativity-culture-guide">
    www.springstreetco.com/creativity-culture-guide
    </a>
    <a href="https://www.annejacoby.com/">
    www.annejacoby.com/
    </a>
    <a href="https://www.sps.nyu.edu/homepage/academics/faculty-directory/13205-anna-a-tavis.html">
    www.sps.nyu.edu/homepage
    </a>
  </div>


  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Anthony Mills</p>

    <a href="https://www.anthonymills.com">
    www.anthonymills.com
    </a>
    <a href="https://www.legacyinnova.com">
    www.legacyinnova.com
    </a>
    <a href="https://resources.strategyx.org/courses/gini-ccino-exam-prep-course">
    resources.strategyx.org/courses/gini-ccino-exam-prep-course
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Arnobio Morelix</p>

    <a href="www.morelix.com">
    www.morelix.com
    </a>
    <a href="https://www.sirius.education/">
    www.sirius.education
    </a>
  
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Bill Jensen</p>

    <a href="https://www.tomorrowsaidy.es">
    www.tomorrowsaidy.es
    </a>
    <a href="https://www.simplerwork.com">
    www.simplerwork.com
    </a>
   
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Braden Kelley</p>

    <a href="https://bradenkelley.com">
    bradenkelley.com
    </a>
    <a href="http://www.amazon.com/Charting-Change-Visual-Toolkit-Making/dp/1137536950/ref=asap_bc?ie=UTF8">
    www.amazon.com/Charting-Change-Visual-Toolkit-Making
    </a>
    <a href="http://www.amazon.com/Stoking-Your-Innovation-Bonfire-Sustainable/dp/0470621672/ref=sr_1_1?ie=UTF8&s=books&qid=1304102753&sr=8-1">
    www.amazon.com/Stoking-Your-Innovation-Bonfire-Sustainable
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Caitlin Guilfoyle</p>

    <a href="https://www.pwc.com.au/important-problems/future-of-work-design-for-the-future/what-workers-want-winning-the-war-for-talent.html">
    www.pwc.com.au/important-problems/future-of-work-design-for-the-future/what-workers-want-winning-the-war-for-talent.html
    </a>
    <a href="https://www.pwc.com.au/important-problems/future-of-work-design-for-the-future/changing-places-hybrid-working.html">
    www.pwc.com.au/important-problems/future-of-work-design-for-the-future/changing-places-hybrid-working.html
    </a>
  </div>
</div>

<div style="height: 950px; width: 90%; display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
  <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 10px 10px 0px">
    <img src=${LogoHackingHR} style="width: 70px; height: 70px">
    <div>
      <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
      <p style="margin-top: -20px">Global Online Conference | ${
        option === "personal-agenda"
          ? "Personalized Agenda"
          : option === "conference-schedule"
          ? "Conference Schedule"
          : "Reported sessions joined"
      } </p>
    </div>
  </div>
  <div style="margin-top: 1rem; width: 800px; padding: 0px 40px; margin-bottom: 190px">
  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Anna Tavis, Ph.D</p>

    <a href="https://www.amazon.com/Humans-Work-Practice-Creating-Workplace/dp/1398604232">
      www.amazon.com/Humans-Work-Practice-Creating-Workplace
    </a>
    <a href="https://www.linkedin.com/newsletters/humans-at-work-6859651747649073152/">
    www.linkedin.com/newsletters
    </a>
    <a href="https://www.sps.nyu.edu/homepage/academics/faculty-directory/13205-anna-a-tavis.html">
    www.sps.nyu.edu/homepage
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Anne Jacoby</p>

    <a href="https://www.springstreetco.com/creativity-culture-guide">
    www.springstreetco.com/creativity-culture-guide
    </a>
    <a href="https://www.annejacoby.com/">
    www.annejacoby.com/
    </a>
    <a href="https://www.sps.nyu.edu/homepage/academics/faculty-directory/13205-anna-a-tavis.html">
    www.sps.nyu.edu/homepage
    </a>
  </div>


  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Anthony Mills</p>

    <a href="https://www.anthonymills.com">
    www.anthonymills.com
    </a>
    <a href="https://www.legacyinnova.com">
    www.legacyinnova.com
    </a>
    <a href="https://resources.strategyx.org/courses/gini-ccino-exam-prep-course">
    resources.strategyx.org/courses/gini-ccino-exam-prep-course
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Arnobio Morelix</p>

    <a href="www.morelix.com">
    www.morelix.com
    </a>
    <a href="https://www.sirius.education/">
    www.sirius.education
    </a>
  
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Bill Jensen</p>

    <a href="https://www.tomorrowsaidy.es">
    www.tomorrowsaidy.es
    </a>
    <a href="https://www.simplerwork.com">
    www.simplerwork.com
    </a>
   
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Braden Kelley</p>

    <a href="https://bradenkelley.com">
    bradenkelley.com
    </a>
    <a href="http://www.amazon.com/Charting-Change-Visual-Toolkit-Making/dp/1137536950/ref=asap_bc?ie=UTF8">
    www.amazon.com/Charting-Change-Visual-Toolkit-Making
    </a>
    <a href="http://www.amazon.com/Stoking-Your-Innovation-Bonfire-Sustainable/dp/0470621672/ref=sr_1_1?ie=UTF8&s=books&qid=1304102753&sr=8-1">
    www.amazon.com/Stoking-Your-Innovation-Bonfire-Sustainable
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Caitlin Guilfoyle</p>

    <a href="https://www.pwc.com.au/important-problems/future-of-work-design-for-the-future/what-workers-want-winning-the-war-for-talent.html">
    www.pwc.com.au/important-problems/future-of-work-design-for-the-future/what-workers-want-winning-the-war-for-talent.html
    </a>
    <a href="https://www.pwc.com.au/important-problems/future-of-work-design-for-the-future/changing-places-hybrid-working.html">
    www.pwc.com.au/important-problems/future-of-work-design-for-the-future/changing-places-hybrid-working.html
    </a>
  </div>
</div>

<div style="height: 950px; width: 90%; display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
  <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 10px 10px 0px">
    <img src=${LogoHackingHR} style="width: 70px; height: 70px">
    <div>
      <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
      <p style="margin-top: -20px">Global Online Conference | ${
        option === "personal-agenda"
          ? "Personalized Agenda"
          : option === "conference-schedule"
          ? "Conference Schedule"
          : "Reported sessions joined"
      } </p>
    </div>
  </div>
  <div style="margin-top: 1rem; width: 800px; padding: 0px 40px; margin-bottom: 235px">
  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Candace Giesbrecht</p>

    <a href="https://teamit.com/agile-peopleops-courses/">
    teamit.com/agile-peopleops-courses/
    </a>
    <a href="https://blog.teamit.com/why-the-future-of-hr-needs-to-be-agile">
    blog.teamit.com/why-the-future-of-hr-needs-to-be-agile
    </a>
    <a href="https://info.teamit.com/teamit-salary-guide">
    info.teamit.com/teamit-salary-guide
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Carolina Astaiza</p>

    <a href="https://www.youtube.com/watch?v=PWHo9UYnvUI">
   www.youtube.com
    </a>
    <a href="https://www.amazon.com/-/es/HUMANOS-red-colaborativa-ebook/dp/B09G7PDJ9K/ref=sr_1_4?__mk_es_US=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2393XLKNG23H8&keywords=recursos+humanos+del+futuro&qid=1645730006&sprefix=recursos+humanos+del+futuro%2Caps%2C125&sr=8-4">
   www.amazon.com/-/es/HUMANOS-red-colaborativa-ebook/dp/B09G7PDJ9K
    </a>
    <a href="https://gerente.com/co/guias/carolina-astaiza/">
    gerente.com/co/guias/carolina-astaiza
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Cassandra Rose</p>

    <a href="https://www.mscassandrarose.com/">
    www.mscassandrarose.com
    </a>
  
    <a href="https://www.meritarc.com/">
    www.meritarc.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Chiara Bersano</p>

    <a href="https://www.youtube.com/channel/UCVfnNeDLGb94zk4HNZxvkRg">
    www.youtube.com
    </a>
  
    <a href="https://www.amazon.com/Quiet-Power-Introverts-World-Talking/dp/0307352153">
    www.amazon.com
    </a>

    <a href="https://www.koganpage.com/product/introduction-to-hr-technologies-9781789665277">
    www.koganpage.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Dave Millner</p>

    <a href="https://www.koganpage.com/product/introduction-to-people-analytics-9781789661804">
    www.koganpage.com
    </a>
  
    <a href="https://hrcurator.com">
    hrcurator.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Deborah Waddill, M.A., Ed.D.</p>

    <a href="https://www.amazon.com/Digital-HR-Deborah-Waddill/dp/1586445421/ref=sr_1_1?crid=1W1IZNNT9JY78&keywords=Waddill+Digital+HR&qid=1645726489&sprefix=waddill+digital+hr%2Caps%2C57&sr=8-1">
    www.amazon.com
    </a>
  
    <a href="https://hbr.org/sponsored/2021/12/4-strategies-for-upskilling-and-reskilling-your-workforce">
    hbr.org
    </a>

    <a href="https://www.shrm.org/executive/resources/articles/pages/how-encourage-hr-innovation-waddill.aspx">
    www.shrm.org
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
  >
    <p>Debra Corey</p>

    <a href="https://www.debcohr.com/free-resources">
    www.debcohr.com/free-resources
    </a>
  
    <a href="https://www.debcohr.com/my-books">
    www.debcohr.com/my-books
    </a>

  </div>
</div>

<div style="height: 950px; width: 90%; display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
  <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 10px 10px 0px">
    <img src=${LogoHackingHR} style="width: 70px; height: 70px">
    <div>
      <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
      <p style="margin-top: -20px">Global Online Conference | ${
        option === "personal-agenda"
          ? "Personalized Agenda"
          : option === "conference-schedule"
          ? "Conference Schedule"
          : "Reported sessions joined"
      } </p>
    </div>
  </div>
  <div style="margin-top: 1rem; width: 800px; padding: 0px 40px; margin-bottom: 160px">
    <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>Diana Wu David</p>

    <a href="www.futureprooflab.com">
    www.futureprooflab.com
    </a>

    <a href="https://www.amazon.com/Future-Proof-Reinventing-Work-Acceleration/dp/1544513607">
    www.amazon.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>Dickson Tang</p>

    <a href="https://www.dicksontang.me/giftshere/">
    www.dicksontang.me
    </a>

    <a href="https://www.amazon.com/dp/B077XF85YC">
    www.amazon.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>Dr Alison Eyring</p>

    <a href="https://www.produgie.com/">
    www.produgie.com
    </a>

    <a href="https://www.amazon.com/Pacing-Growth-Intelligent-Restraint-Long-term/dp/1626568170">
    www.amazon.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>Dr Tracey Leghorn</p>

    <a href="https://leicester.figshare.com/articles/thesis/The_Best_of_Both_Worlds_Combining_Work_and_Motherhood_on_a_24_7_Planet/10215899/">
    leicester.figshare.com
    </a>
  </div>


  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>Dr. Ayanna R. Cummings</p>

    <a href="https://www.tapestrydiversity.com">
    www.tapestrydiversity.com
    </a>

    <a href="https://www.amazon.com/Power-Culture-Race-Ayanna-Cummings/dp/1664122486/ref=sr_1_3?crid=3V2JVLX1Y8TFK&keywords=power+culture+and+race+ayanna+cummings&qid=1645710621&sprefix=power+culture+and+race+ayanna+cummings%2Caps%2C86&sr=8-3">
    www.amazon.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>Dr. Laura Wünsch Wendt</p>

    <a href="https://www.cemsmagazine.org/diversity-and-inclusion-2-0">
    www.cemsmagazine.org
    </a>

    <a href="https://www.linkedin.com/feed/update/urn:li:activity:6634005298866593792/">
    www.linkedin.com
    </a>

    <a href="https://healthcare-insights.siemens-info.com/en/whats-up/getting-the-spark-to-catch.html">
   healthcare-insights.siemens-info.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>Dr. Maja Zelihic</p>

    <a href="https://drdianehamilton.com/perception-power-system/perception-power-index/">
    drdianehamilton.com
    </a>

    <a href="http://drmajazelihic.com/">
    drmajazelihic.com
    </a>

    <a href="https://healthcare-insights.siemens-info.com/en/whats-up/getting-the-spark-to-catch.html">
   healthcare-insights.siemens-info.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>Dr. Stefanie Johnson</p>

    <a href="https://inclusifybook.com/">
    inclusifybook.com
    </a>

    <a href="https://drstefjohnson.com/">
    drstefjohnson.com
    </a>

    <a href="https://www.amazon.com/Inclusify-Power-Uniqueness-Belonging-Innovative/dp/0062947273">
    www.amazon.com
    </a>
  </div>
  </div>
</div>

<div style="height: 950px; width: 90%; display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
  <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 10px 10px 0px">
    <img src=${LogoHackingHR} style="width: 70px; height: 70px">
    <div>
      <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
      <p style="margin-top: -20px">Global Online Conference | ${
        option === "personal-agenda"
          ? "Personalized Agenda"
          : option === "conference-schedule"
          ? "Conference Schedule"
          : "Reported sessions joined"
      } </p>
    </div>
  </div>
  <div style="margin-top: 1rem; width: 800px; padding: 0px 40px; margin-bottom: 160px">
    <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>Dr. Tracy Brower</p>

    <a href="https://tracybrower.com/publications/">
    tracybrower.com
    </a>

    <a href="https://www.amazon.com/Secrets-Happiness-Work-Purpose-Fulfillment/dp/1728230896/ref=sr_1_2?dchild=1&keywords=secrets+to+happiness+at+work&qid=1606271086&sr=8-2&pldnSite=1">
    www.amazon.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>Edie Goldberg</p>

    <a href="https://www.TheInsideGig.com">
    www.TheInsideGig.com
    </a>

    <a href="https://engagedly.com/performance-management-masterclass-1/">
   engagedly.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Frances West
    </p>

    <a href="https://franceswest.co/">
    franceswest.co
    </a>

    <a href="https://www.amazon.com/Authentic-InclusionTM-Drives-Disruptive-Innovation/dp/1949639347">
    www.amazon.com
    </a>

    <a href="http://www.businessanddisability.org/wp-content/uploads/2021/03/Digital-accessibility-primer.pdf">
    www.businessanddisability.org
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Garrison Gibbons
    </p>

    <a href="https://www.garrisongibbons.com">
    https://www.garrisongibbons.com
    </a>

  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Gena Cox, Ph.D.
    </p>

    <a href="https://genacoxbook.com/leadinginclusion/">
    genacoxbook.com
    </a>

    <a href="https://feelshuman.com">
    feelshuman.com
    </a>

  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Gwenevere Crary
    </p>

    <a href="https://guidetohr.com/people-and-culture/">
    guidetohr.com
    </a>

    <a href="https://www.linkedin.com/company/guide2hr">
    www.linkedin.com
    </a>

  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Harrison Kim
    </p>

    <a href="https://www.pavestep.com/">
    www.pavestep.com
    </a>

    <a href="https://www.pavestep.com/performance-management-guidebook">
    www.pavestep.com
    </a>

  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Jamie Qiu
    </p>

    <a href="https://studiozao.com/intrapreneurship-white-paper-2022">
    studiozao.com
    </a>
  </div>

  </div>
</div>

<div style="height: 950px; width: 90%; display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 180px">
  <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 10px 10px 0px">
    <img src=${LogoHackingHR} style="width: 70px; height: 70px">
    <div>
      <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
      <p style="margin-top: -20px">Global Online Conference | ${
        option === "personal-agenda"
          ? "Personalized Agenda"
          : option === "conference-schedule"
          ? "Conference Schedule"
          : "Reported sessions joined"
      } </p>
    </div>
  </div>
  <div style="margin-top: 1rem; width: 800px; padding: 0px 40px; margin-bottom: 160px">
    <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>Joanne (Jo) Fair</p>

    <a href="https://www.futureworkstudio.com">
    www.futureworkstudio.com
    </a>

    <a href="https://www.youtube.com/watch?v=6VocrPMrZ-U&feature=youtu.be">
   www.youtube.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>John O'Duinn</p>

    <a href="https://distributedteamsbook.com/">
    distributedteamsbook.com
    </a>

    <a href="https://distributedgov.com/">
    distributedgov.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Julie Missaggia
    </p>

    <a href="https://cmimediagroup.com/">
    cmimediagroup.com
    </a>

    <a href="https://www.wpp.com/people/careers">
    www.wpp.com
    </a>
  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Kate Lister
    </p>

    <a href="http://globalworkplaceanalytics.com/whitepapers">
    globalworkplaceanalytics.com
    </a>

    <a href="http://globalworkplaceanalytics.com/roi">
    GlobalWorkplaceAnalytics.com
    </a>

    <a href="https://globalworkplaceanalytics.com/videos">
    globalworkplaceanalytics.com
    </a>

  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Khalil Zafar
    </p>

    <a href="https://www.amazon.com/Future-Work-Simplified-Understand-Organization/dp/B08DSND2L9">
    www.amazon.com
    </a>

  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Kristy Wallace
    </p>

    <a href="https://www.ellevatenetwork.com/">
    www.ellevatenetwork.com
    </a>

  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Kyle Elliott, MPA, CHES
    </p>

    <a href="https://caffeinatedkyle.com/">
    caffeinatedkyle.com
    </a>

    <a href="https://www.instagram.com/caffeinatedkyle/">
    www.instagram.com
    </a>

  </div>

  <div
  style="width: 100%; display: flex; flex-direction: column; margin-top: 20px;"
    >
    <p>
    Lauren Lefkowitz
    </p>

    <a href="https://www.fineisatrap.com">
    www.fineisatrap.com
    </a>

    <a href="https://laurenlefkowitzcoach.com">
    laurenlefkowitzcoach.com
    </a>
  </div>

  </div>
</div>


`;
  }

  template.innerHTML = content;

  return template;
};

export { formatAnnualConference };
