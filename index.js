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
  Parse Indonesia' COVID-19 API with jQuery
  API: https://apicovid19indonesia-v2.vercel.app/api/indonesia
  Code reference: https://zetcode.com/javascript/jsonurl/
*/
var API_URL = "https://apicovid19indonesia-v2.vercel.app/api/indonesia";

$.getJSON(API_URL, function (data) {
  // Positives
  var positivesData = `${data.positif}`;
  var positivesElement = document.createElement("th");
  positivesElement.innerHTML = addThousandsSeparator(positivesData);

  // Negatives
  var negativesData = `${data.sembuh}`;
  var negativesElement = document.createElement("th");
  negativesElement.innerHTML = addThousandsSeparator(negativesData);

  // Deaths
  var deathsData = `${data.meninggal}`;
  var deathsElement = document.createElement("th");
  deathsElement.innerHTML = addThousandsSeparator(deathsData);

  // Patient
  var patientData = `${data.dirawat}`;
  var patientElement = document.createElement("th");
  patientElement.innerHTML = addThousandsSeparator(patientData);

  // Process the gathered data
  var htmlTable = document.getElementById("table-data");
  htmlTable.appendChild(positivesElement);
  htmlTable.appendChild(negativesElement);
  htmlTable.appendChild(deathsElement);
  htmlTable.appendChild(patientElement);

  // Show last update on table caption
  var lastUpdateData = `${data.lastUpdate}`;
  var captionTable = document.getElementById("table-caption");
  captionTable.innerHTML += "(" + lastUpdateData + ")";
});
