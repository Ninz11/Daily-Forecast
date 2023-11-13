function handleCitySubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
}

let citySearch = document.querySelector("#search-city-name");
citySearch.addEventListener("submit", handleCitySubmit);
