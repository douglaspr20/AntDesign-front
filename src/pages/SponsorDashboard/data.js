import COUNTRIES from "enum/Countries";
import { isEmpty } from "lodash";

function getCount(allUsers, field, value) {
  return allUsers.reduce((previousValue, currentValue) => {
    if (currentValue[field] === value) {
      previousValue += 1;
    }

    return previousValue;
  }, 0);
}

export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Open to receiving information/being contacted via email about open job positions.",
    },
  },
};

function getPercentage(originalNum, totalNum) {
  return (originalNum / totalNum) * 100;
}

export function getDoughnutData1(allUsers) {
  return {
    labels: ["Yes", "No"],
    datasets: [
      {
        label:
          "Open to receiving information/being contacted via email about open job positions.",
        data: [
          getPercentage(
            getCount(allUsers, "isOpenReceivingEmail", 1),
            allUsers.length
          ),
          getPercentage(
            getCount(allUsers, "isOpenReceivingEmail", -1),
            allUsers.length
          ),
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
}

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "What best defines your current or most recent job level?",
    },
  },
};

export function getDoughnutData2(allUsers) {
  const cSuite = getCount(allUsers, "recentJobLevel", "C-Suite");
  const VP = getCount(allUsers, "recentJobLevel", "VP or SVP");
  const director = getCount(allUsers, "recentJobLevel", "Director");
  const manager = getCount(allUsers, "recentJobLevel", "Manager");
  const professional = getCount(allUsers, "recentJobLevel", "Professional");
  const junior = getCount(allUsers, "recentJobLevel", "Junior");
  const noInfo =
    allUsers.length -
    (cSuite + VP + director + manager + professional + junior);

  return {
    labels: [
      "C-Suite",
      "VP or SVP",
      "Director",
      "Manager",
      "Professional",
      "Junior",
      "No Info",
    ],
    datasets: [
      {
        label: "What best defines your current or most recent job level?",
        data: [
          getPercentage(cSuite, allUsers.length),
          getPercentage(VP, allUsers.length),
          getPercentage(director, allUsers.length),
          getPercentage(manager, allUsers.length),
          getPercentage(professional, allUsers.length),
          getPercentage(junior, allUsers.length),
          getPercentage(noInfo, allUsers.length),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(22, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(22, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
}

export const options3 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "In what area of HR do you currently work or most recently worked?",
    },
  },
};

function getCountRecentWorkArea(allUsers, field, value) {
  return allUsers.reduce((previousValue, currentValue) => {
    if (currentValue[field].includes(value)) {
      previousValue += 1;
    }

    return previousValue;
  }, 0);
}

export function getDoughnutData3(allUsers) {
  const compensationBenefits = getCountRecentWorkArea(
    allUsers,
    "recentWorkArea",
    "Compensation/Benefits"
  );
  const cultureEmployeeExperience = getCountRecentWorkArea(
    allUsers,
    "recentWorkArea",
    "Culture/Employee Experience"
  );
  const laborRelationsPolicy = getCountRecentWorkArea(
    allUsers,
    "recentWorkArea",
    "Labor relations/Policy"
  );
  const learningTalentDevelopment = getCountRecentWorkArea(
    allUsers,
    "recentWorkArea",
    "Learning / Talent Development"
  );
  const organizationalChange = getCountRecentWorkArea(
    allUsers,
    "recentWorkArea",
    "Organizational Change Management / Transformation"
  );
  const organizationalDesign = getCountRecentWorkArea(
    allUsers,
    "recentWorkArea",
    "Organizational Design"
  );
  const peopleAnalytics = getCountRecentWorkArea(
    allUsers,
    "recentWorkArea",
    "People Analytics"
  );
  const talentAcquisition = getCountRecentWorkArea(
    allUsers,
    "recentWorkArea",
    "Talent acquisition/recruitment"
  );
  const talentManagement = getCountRecentWorkArea(
    allUsers,
    "recentWorkArea",
    "Talent Management"
  );
  const allOfTheAbove = getCountRecentWorkArea(
    allUsers,
    "recentWorkArea",
    "all"
  );

  const noData =
    allUsers.length -
    (compensationBenefits +
      cultureEmployeeExperience +
      laborRelationsPolicy +
      learningTalentDevelopment +
      organizationalChange +
      organizationalDesign +
      peopleAnalytics +
      talentAcquisition +
      talentManagement +
      allOfTheAbove);

  return {
    labels: [
      "Compensation/Benefits",
      "Culture/Employee Experience",
      "Labor relations/Policy",
      "Learning / Talent Development",
      "Organizational Change Management / Transformation",
      "Organizational Design",
      "People Analytics",
      "Talent acquisition/recruitment",
      "Talent Management",
      "All of the Above",
      "No Data",
    ],
    datasets: [
      {
        label:
          "In what area of HR do you currently work or most recently worked?",
        data: [
          getPercentage(compensationBenefits, allUsers.length),
          getPercentage(cultureEmployeeExperience, allUsers.length),
          getPercentage(laborRelationsPolicy, allUsers.length),
          getPercentage(learningTalentDevelopment, allUsers.length),
          getPercentage(organizationalChange, allUsers.length),
          getPercentage(organizationalDesign, allUsers.length),
          getPercentage(peopleAnalytics, allUsers.length),
          getPercentage(talentAcquisition, allUsers.length),
          getPercentage(talentManagement, allUsers.length),
          getPercentage(allOfTheAbove, allUsers.length),
          getPercentage(noData, allUsers.length),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(22, 159, 64, 0.2)",
          "rgba(11, 72, 134, 0.2)",
          "rgba(14, 69, 222, 0.2)",
          "rgba(199, 19, 64, 0.2)",
          "rgba(7, 12, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(22, 159, 64, 1)",
          "rgba(11, 72, 134, 1)",
          "rgba(14, 69, 222, 1)",
          "rgba(199, 19, 64, 1)",
          "rgba(7, 12, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
}

export const optionCountry = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Countries",
    },
  },
};

function findCountry(country) {
  const retVal = COUNTRIES.find((cntry) => cntry.value === country);

  return !isEmpty(retVal) ? retVal.text : "Rest of the world";
}

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return {
    backgroundColor:
      "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ", 0.2)",
    borderColor:
      "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ", 1)",
  };
}

export function getCountries(allUsers) {
  let countriesCount = {
    restOfTheWorld: 0,
  };

  allUsers.map((user) => {
    return (countriesCount[user.location] = 0);
  });

  allUsers.map((user) => {
    return (countriesCount[user.location] += 1);
  });

  for (let [key, value] of Object.entries(countriesCount)) {
    if (value === 0) {
      countriesCount.restOfTheWorld += 1;
      delete countriesCount[key];
    }
  }

  let labels = [];
  let data = [];

  for (let [key, value] of Object.entries(countriesCount)) {
    const country = findCountry(key);

    labels.push(country);
    data.push(getPercentage(value, allUsers.length));
  }

  return {
    labels: labels,
    datasets: [
      {
        label: "Countries",
        data: data,
        backgroundColor: labels.map(() => {
          return random_rgba().backgroundColor;
        }),
        borderColor: labels.map(() => {
          return random_rgba().borderColor;
        }),
        borderWidth: 1,
      },
    ],
  };
}
