const searchElement = document.querySelector("#city-search");
// const searchBox = new google.maps.places.PlacesService(searchElement);
const searchBox = new google.maps.places.SearchBox(searchElement);

console.log(searchBox.getPlaces());

searchBox.addListener("places_changed", () => {
  const city = searchBox.getPlaces()[0];
  if (city == null) return;
  const latitude = city.geometry.location.lat();
  const longitude = city.geometry.location.lng();

  //   console.log(latitude, longitude);

  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getWeatherData(data, city.formatted_address);
    })
    .catch((error) => console.log("Error:", error));
});

const locationElement = document.querySelector(".location");
const statusElement = document.querySelector(".status");
const iconElement = document.querySelector(".weather-icon");
const windElement = document.querySelector(".wind");
const temperatureElement = document.querySelector(".temperature");
const humidityElement = document.querySelector(".humidity");

function getWeatherData(weatherData, cityName) {
  locationElement.textContent = cityName;
  statusElement.textContent = weatherData.weather[0].description;
  iconElement.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  windElement.textContent = weatherData.wind_speed + " km/h";
  temperatureElement.textContent = weatherData.temp + "°C";
  humidityElement.textContent = weatherData.humidity + "%";
  document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${cityName}")`;
}
