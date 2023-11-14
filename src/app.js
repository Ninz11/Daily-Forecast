function retainWeatherInfo(response) {
  let currentTemperature = document.querySelector("#city-weather-temp");
  let cityElement = document.querySelector("#city");
  let cityDescription = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-mph");
  let dayTime = document.querySelector("#day-time");
  let date = new Date(response.data.time * 1000);

  dayTime.innerHTML = currentDate(date);
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  cityDescription.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}mph`;
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
search("London");
