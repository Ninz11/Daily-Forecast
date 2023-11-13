function retainWeatherInfo(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#city-weather-temp");
  let cityElement = document.querySelector("#city");

  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
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
