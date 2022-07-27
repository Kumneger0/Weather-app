
//http://api.weatherapi.com/v1/forecast.json%20?key=ab577bbd33454747b5d65922222507&q=Addis_Abeba&days=3
const apiKey = "ab577bbd33454747b5d65922222507";
const countryName = document.querySelector(".countryName");
const cityName = document.querySelector(".cityName");
const airCondition = document.querySelector(".airCondition");
const temprature_C = document.querySelector(".temprature_C");
const temprature_F = document.querySelector(".temprature_F");
const searchBox = document.getElementById("searchBox");
const btnSeach = document.querySelector("#btnSeach");
const resFromErr = document.querySelector(".resFromErr");
const imgForCondition = document.querySelector(".imgForCondition");
const load = document.querySelector(".load");
btnSeach.addEventListener("click", () => {
  document.querySelector(".tempInfo").style.display = "none";
  document.querySelector(".innerConatiner").style.display = "none";
  load.classList.add("loader");
  const country = searchBox.value;
  const url = `https://api.weatherapi.com/v1/forecast.json%20?key=${apiKey}&q=${country}&days=3`;
  axios(url)
    .then((res) => {
      if (res.data) {
        console.log(res);
        load.classList.remove("loader");
        document.querySelector(".errorContainer").style.display = "none";

        document.querySelector(".innerConatiner").style.display = "flex";
        countryName.innerText = res.data.location.country;
        cityName.innerText = res.data.location.name;
        airCondition.innerText = res.data.current.condition.text;
        let icon = "https://" + res.data.current.condition.icon;
        imgForCondition.setAttribute("src", icon);
        temprature_C.innerText = `Tempreture in celsius:   ${res.data.current.temp_c}C`;
        temprature_F.innerText = `Tempreture in Farenheit: ${res.data.current.temp_f} F`;
        searchBox.value = null;
      }
    })
    .catch((err) => {
      console.log(err);
      load.classList.remove("loader");
      document.querySelector(".innerConatiner").style.display = "none";
      document.querySelector(".tempInfo").style.display = "none";
      document.querySelector(".errorContainer").style.display = "flex";
      if (err.response.data.error.code == 1006) {
        searchBox.value = null;
        resFromErr.innerText = err.response.data.error.message;
      } else {
        resFromErr.innerText = "city name required";
        searchBox.value = null;
      }
    });
});
