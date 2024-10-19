const apiKey = "a09d39f12e3998066e17c4d14c27aa53";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// querySelector to select the first elements by their class name , if all use  querySelectorAll();
const cityInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');

const cityName = document.querySelector('.city');
const cityTemp = document.querySelector('.temp');
const cityHumidity = document.querySelector('.humidity');
const cityWind = document.querySelector('.wind');
const cityWeatherIcon = document.querySelector('.weather-icon');
const weatherSection = document.querySelector('.weather');
const weatherNotFoundSection = document.querySelector('.notFound');



async function getWeather(city) { 
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    var data = await response.json();

    if (data.cod === "404") {
        weatherSection.classList.add('hidden'); // Hide weather section
        weatherNotFoundSection.classList.remove('hidden'); // Display "not found" message
    }
    else {
        cityName.innerHTML = data.name;
        cityTemp.innerHTML = Math.round(data.main.temp) + "°C";
        cityHumidity.innerHTML = data.main.humidity + "%";
        cityWind.innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === "Clouds") {
            cityWeatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            cityWeatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            cityWeatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Snow") {
            cityWeatherIcon.src = "images/snow.png";
        } else if (data.weather[0].main === "mist") {
            cityWeatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main === "drizzle") {
            cityWeatherIcon.src = "images/drizzle.png";
        }
        // weatherSection.style.display = "block";
        if(!weatherNotFoundSection.classList.contain('hidden')){
            weatherNotFoundSection.classList.add('hidden');
        }
        weatherSection.classList.remove('hidden');
    }
}

searchButton.addEventListener('click', () => { 
    getWeather(cityInput.value);
})
