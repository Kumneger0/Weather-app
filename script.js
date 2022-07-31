
//http://api.weatherapi.com/v1/forecast.json%20?key=ab577bbd33454747b5d65922222507&q=Addis_Abeba&days=3
const apiKey = "ab577bbd33454747b5d65922222507";
const countryName = document.querySelector(".countryName");
const airCondition = document.querySelector(".airCondition");
const temprature_C = document.querySelector(".temprature_C");
const temprature_F = document.querySelector(".temprature_F");
const searchBox = document.getElementById("searchBox");
const btnSearch = document.getElementById("btnSearch");
const imgForCondition = document.querySelector(".imgForCondition");
const loading = document.querySelector(".loading");
btnSearch.addEventListener("click", displayData);
async function displayData() {
  loading.style.display = "block";
  const country = searchBox.value;
  const url = `https://api.weatherapi.com/v1/forecast.json%20?key=${apiKey}&q=${country}&days=3`;
  const response = await axios(url).catch((err) => err);
  if (response.data) {
    loading.style.display = "none";
    searchBox.value = "";
    countryName.innerText = `${response.data.location.name}/${response.data.location.country}`;
    airCondition.innerText = response.data.current.condition.text;
    let icon = "https://" + response.data.current.condition.icon;
    imgForCondition.setAttribute("src", icon);
    temprature_C.innerText = `${response.data.current.temp_c}°C`;
    return;
  }
  if (!response.data) {
    loading.style.display = "none";
    searchBox.value = "";
    countryName.innerText =
      response.response.data.error.code == 1006
        ? response.response.data.error.message
        : "city name required";
    airCondition.innerText = "Error";
    imgForCondition.removeAttribute("src");
    temprature_C.innerText = "Error";
  }
}
