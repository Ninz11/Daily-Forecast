function retainWeatherInfo(response) {
  let currentTemperature = document.querySelector("#city-weather-temp");
  let cityElement = document.querySelector("#city");
  let cityDescription = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-mph");
  let dayTime = document.querySelector("#day-time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#weather-icon");

  dayTime.innerHTML = currentDate(date);
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  cityDescription.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}mph`;
  weatherIcon.innerHTML = `<img
              src=
              "${response.data.condition.icon_url}"class="city-weather-emoji"
            />`;
  getForecast(response.data.city);
}

function currentDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "0t4369b8fdae423afc4eebc21fcao402";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(retainWeatherInfo);
}

function handleCitySubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  search(cityInput.value);
}

let citySearch = document.querySelector("#search-city-name");
citySearch.addEventListener("submit", handleCitySubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "0t4369b8fdae423afc4eebc21fcao402";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios(apiUrl).then(presentForecast);
}

function presentForecast(response) {
  console.log(response.data);
  let weatherForecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      weatherForecastHtml =
        weatherForecastHtml +
        `
    <div class="forecast-container">
    <div class="forecast-day">${formatDay(day.time)}</div>
    <img src="${day.condition.icon_url}"  class="icon"/>
    <div class="day-one-temp">
    <span class="day-one-max">${Math.round(day.temperature.maximum)}º</span>
    <span class="day-one-min">${Math.round(day.temperature.minimum)}º</span>
    </div>
    </div>
    `;
    }
  });
  let weatherForecast = document.querySelector("#weather-forecast");
  weatherForecast.innerHTML = weatherForecastHtml;
}
search("London");
getForecast("Paris");
