/*
  CekKopit Version
*/
const cekKopitVersion = "2.0";
var introTitle = document.getElementById("intro-lead");
introTitle.innerHTML += ` (v${cekKopitVersion})`

/*
  Thousands separator
  Reference:
  - https://aioos.wordpress.com/2013/07/02/add-thousand-separator-to-value-in-javascript/
  - https://stackoverflow.com/a/32355056
*/
function addThousandsSeparator(no) {
  return no.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}

/*
  Trim Last Update
  Reference:
  - https://stackoverflow.com/a/13634687
  - https://aioos.wordpress.com/2013/07/02/add-thousand-separator-to-value-in-javascript/
  - https://stackoverflow.com/a/32355056
*/
function trimLastUpdate(lastUpdate) {
  return lastUpdate.split("T")[0];
}

/*
  Parse Indonesia' COVID-19 API with jQuery
  API: https://test-api.cekkopit.manudinata.me/api/indonesia/harian
  Code reference: https://zetcode.com/javascript/jsonurl/
*/
var API_URL = "https://test-api.cekkopit.manudinata.me/api/indonesia/harian";

// Arrays for chart.js
var positivesRewindArray = [];
var negativesRewindArray = [];
var deathsRewindArray = [];
var patientRewindArray = [];
var lastUpdateRewindArray = [];

$.ajax({
  url: API_URL,
  dataType: "json",
  success: (data) => {
    // #data-table
    // Positives
    var positivesData = `${data[data.length - 1].positif_kumulatif}`;
    var positivesElement = document.createElement("th");
    positivesElement.innerHTML = addThousandsSeparator(positivesData);

    // Negatives
    var negativesData = `${data[data.length - 1].sembuh_kumulatif}`;
    var negativesElement = document.createElement("th");
    negativesElement.innerHTML = addThousandsSeparator(negativesData);

    // Deaths
    var deathsData = `${data[data.length - 1].meninggal_kumulatif}`;
    var deathsElement = document.createElement("th");
    deathsElement.innerHTML = addThousandsSeparator(deathsData);

    // Patient
    var patientData = `${data[data.length - 1].dirawat_kumulatif}`;
    var patientElement = document.createElement("th");
    patientElement.innerHTML = addThousandsSeparator(patientData);

    // Last Update
    var lastUpdateData = `${data[data.length - 1].tanggal}`;

    // Process the gathered data
    var htmlTable = document.getElementById("table-data");
    htmlTable.appendChild(positivesElement);
    htmlTable.appendChild(negativesElement);
    htmlTable.appendChild(deathsElement);
    htmlTable.appendChild(patientElement);

    // Show last update on table caption
    var tableCaption = document.getElementById("table-caption");
    tableCaption.innerHTML += "(" + trimLastUpdate(lastUpdateData) + ")";

    // #rewind-data-table
    for (let i = 1; i < 8; i++) {
      // Positives
      var positivesRewindData = `${data[data.length - i].positif_kumulatif}`;
      var positivesRewindElement = document.createElement("th");
      positivesRewindElement.innerHTML = addThousandsSeparator(positivesRewindData);

      // Negatives
      var negativesRewindData = `${data[data.length - i].sembuh_kumulatif}`;
      var negativesRewindElement = document.createElement("th");
      negativesRewindElement.innerHTML = addThousandsSeparator(negativesRewindData);

      // Deaths
      var deathsRewindData = `${data[data.length - i].meninggal_kumulatif}`;
      var deathsRewindElement = document.createElement("th");
      deathsRewindElement.innerHTML = addThousandsSeparator(deathsRewindData);

      // Patients
      var patientRewindData = `${data[data.length - i].dirawat_kumulatif}`;
      var patientRewindElement = document.createElement("th");
      patientRewindElement.innerHTML = addThousandsSeparator(patientRewindData);

      // Last updates
      var lastUpdateRewindData = `${data[data.length - i].tanggal}`;
      var lastUpdateRewindElement = document.createElement("th");
      lastUpdateRewindElement.innerHTML = trimLastUpdate(lastUpdateRewindData);

      // Process the gathered data
      var tableRewindEntries = document.createElement("tr");
      tableRewindEntries.appendChild(positivesRewindElement);
      tableRewindEntries.appendChild(negativesRewindElement);
      tableRewindEntries.appendChild(deathsRewindElement);
      tableRewindEntries.appendChild(patientRewindElement);
      tableRewindEntries.appendChild(lastUpdateRewindElement);

      // Append all `<tr>` to `<tbody>`
      var htmlTable = document.getElementById("rewind-table-body");
      htmlTable.appendChild(tableRewindEntries);

      // Add arrays entries for chart.js
      positivesRewindArray[i - 1] = positivesRewindData;
      negativesRewindArray[i - 1] = negativesRewindData;
      deathsRewindArray[i - 1] = deathsRewindData;
      patientRewindArray[i - 1] = patientRewindData;
      lastUpdateRewindArray[i - 1] = trimLastUpdate(lastUpdateRewindData);
    }

    // Charts configuration
    positivesRewindArrayReversed = positivesRewindArray.reverse();
    negativesRewindArrayReversed = negativesRewindArray.reverse();
    deathsRewindArrayReversed = deathsRewindArray.reverse();
    patientRewindArrayReversed = patientRewindArray.reverse();
    lastUpdateRewindArrayReversed = lastUpdateRewindArray.reverse();

    const chartPositivesConfig = {
      type: "line",
      data: {
        labels: lastUpdateRewindArrayReversed,
        datasets: [
          {
            label: "Positif",
            backgroundColor: "rgb(0, 0, 0)",
            borderColor: "rgb(0, 0, 0)",
            data: positivesRewindArrayReversed,
          },
        ],
      },
      options: {},
    };

    const chartNegativesConfig = {
      type: "line",
      data: {
        labels: lastUpdateRewindArrayReversed,
        datasets: [
          {
            label: "Negatif",
            backgroundColor: "rgb(0, 204, 0)",
            borderColor: "rgb(0, 204, 0)",
            data: negativesRewindArrayReversed,
          },
        ],
      },
      options: {},
    };

    const chartDeathsConfig = {
      type: "line",
      data: {
        labels: lastUpdateRewindArrayReversed,
        datasets: [
          {
            label: "Meninggal",
            backgroundColor: "rgb(255, 0, 0)",
            borderColor: "rgb(255, 0, 0)",
            data: deathsRewindArrayReversed,
          },
        ],
      },
      options: {},
    };

    const chartPatientConfig = {
      type: "line",
      data: {
        labels: lastUpdateRewindArrayReversed,
        datasets: [
          {
            label: "Dirawat",
            backgroundColor: "rgb(255, 204, 0)",
            borderColor: "rgb(255, 204, 0)",
            data: patientRewindArrayReversed,
          },
        ],
      },
      options: {},
    };

    // Render the chart
    new Chart(document.getElementById("positivesChart").getContext("2d"), chartPositivesConfig);
    new Chart(document.getElementById("negativesChart").getContext("2d"), chartNegativesConfig);
    new Chart(document.getElementById("deathsChart").getContext("2d"), chartDeathsConfig);
    new Chart(document.getElementById("patientChart").getContext("2d"), chartPatientConfig);

    // Hide loader and finally display tables and chart
    document.getElementById("data-loader").style.display = "none";
    document.getElementById("data-table").style.display = "block";
    document.getElementById("rewind-data-table").style.display = "block";
    document.getElementById("chart").style.display = "block";
  },
  error: () => {
    document.getElementById("data-loader-text").textContent = "Tidak dapat memuat data!";
  },
});
