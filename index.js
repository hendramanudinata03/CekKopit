/*
  Parse Indonesia' COVID-19 API with jQuery
  API: https://data.covid19.go.id/public/api/update.json
  Code reference: https://zetcode.com/javascript/jsonurl/
*/
var API_URL = "https://data.covid19.go.id/public/api/update.json";

$.getJSON(API_URL, function (data) {
  // Positives
  var positivesData = `${data.update.total.jumlah_positif}`;
  var positivesElement = document.createElement("th");
  positivesElement.innerHTML = positivesData;

  // Negatives
  var negativesData = `${data.update.total.jumlah_sembuh}`;
  var negativesElement = document.createElement("th");
  negativesElement.innerHTML = negativesData;

  // Deaths
  var deathsData = `${data.update.total.jumlah_meninggal}`;
  var deathsElement = document.createElement("th");
  deathsElement.innerHTML = deathsData;

  // Patient
  var patientData = `${data.update.total.jumlah_dirawat}`;
  var patientElement = document.createElement("th");
  patientElement.innerHTML = patientData;

  // Process the gathered data
  var htmlTable = document.getElementById("table-data");
  htmlTable.appendChild(positivesElement);
  htmlTable.appendChild(negativesElement);
  htmlTable.appendChild(deathsElement);
  htmlTable.appendChild(patientElement);
});
