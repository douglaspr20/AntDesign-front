/* eslint-disable no-useless-escape */
import moment from "moment-timezone";
import { TIMEZONE_LIST } from "enum";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isValidPassword(pw) {
  let result = 0;
  if (!pw) {
    result = 5; // null
  } else if (pw.length < 8) {
    result = 1; // length
  } else {
    let containNumber = false;
    let containCapical = false;
    let containUpperCase = false;
    for (let i = 0; i < pw.length; i++) {
      const c = pw.charAt(i);
      if (!isNaN(c)) {
        containNumber = true;
      }
      let characterPattern = /[~`@!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g;
      if (characterPattern.test(c)) {
        containCapical = true;
      }
      let upperCasePattern = /^[A-Z]*$/;
      let result = upperCasePattern.test(c);
      if (result) {
        containUpperCase = true;
      }
    }
    if (!containNumber) {
      result = 2;
    }
    if (!containCapical) {
      result = 3;
    }
    if (!containUpperCase) {
      result = 4;
    }
  }

  return result;
}

function isValidURL(string) {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function getEventDescription(rawData) {
  if (rawData && rawData.blocks) {
    return rawData.blocks.map((item) => item.text).join(`/n`);
  }

  return rawData;
}

function convertToCertainTime(date, tz) {
  let res = moment();
  const timezone = TIMEZONE_LIST.find((item) => item.value === tz);

  if (timezone) {
    res = moment.utc(date).tz(timezone.utc[0]);
  } else {
    res = moment(date);
  }

  return res;
}

function getEventPeriod(date, date2, timezone) {
  let res = "";
  const startDate = convertToCertainTime(date, timezone);
  const endDate = convertToCertainTime(date2, timezone);
  let tz = TIMEZONE_LIST.find((item) => item.value === timezone);
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

  if (
    startDate.year() === endDate.year() &&
    startDate.month() === endDate.month() &&
    startDate.date() === endDate.date()
  ) {
    res = `${startDate.format("MMMM DD, yyyy | h:mm a")} - ${endDate.format(
      "h:mm a"
    )} ${tz}`;
  } else {
    res = `${startDate.format("MMMM DD, yyyy | h:mm a")} - ${endDate.format(
      "MMMM DD, yyyy h:mm a"
    )} ${tz}`;
  }

  return res;
}

// date:moment, tz:string
function convertToUTCTime(date, tz) {
  let res = moment(date).format("YYYY-MM-DD h:mm a");

  const timezone = TIMEZONE_LIST.find((item) => item.value === tz);
  if (timezone) {
    res = moment.tz(res, "YYYY-MM-DD h:mm a", timezone.utc[0]).utc().format();
  } else {
    const localTimezone = moment.tz.guess();
    res = moment.tz(res, "YYYY-MM-DD h:mm a", localTimezone).format();
  }

  return res;
}

function convertToLocalTime(date) {
  const localTimezone = moment.tz.guess();

  return moment.utc(date).tz(localTimezone);
}

const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export {
  numberWithCommas,
  isValidPassword,
  isValidURL,
  isValidEmail,
  getEventPeriod,
  getEventDescription,
  convertToCertainTime,
  convertToUTCTime,
  convertToLocalTime,
  convertBlobToBase64,
};
