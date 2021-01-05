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

export { numberWithCommas, isValidPassword };
