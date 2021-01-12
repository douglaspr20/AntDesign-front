/* eslint-disable no-useless-escape */
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
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export { numberWithCommas, isValidPassword, isValidURL, isValidEmail };
