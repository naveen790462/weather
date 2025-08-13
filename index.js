// Replace with your OpenWeatherMap API key
const API_KEY = "1211035e23880f66c40b4726a5b277d5"; 

const searchInput = document.getElementById("valueSearch");
const form = document.querySelector("form");

const cityName = document.getElementById("city").querySelector("figcaption");
const flagImg = document.getElementById("city").querySelector("img");
const temperature = document.getElementById("temperature").querySelector("span");
const weatherIcon = document.getElementById("temperature").querySelector("img");
const description = document.querySelector(".description");
const clouds = document.getElementById("clouds");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");

// Fetch weather data
async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        if (!res.ok) {
            alert("City not found!");
            return;
        }
        const data = await res.json();
        updateUI(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

// Update UI
function updateUI(data) {
    cityName.textContent = data.name;
    flagImg.src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
    temperature.textContent = Math.round(data.main.temp);
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    description.textContent = data.weather[0].description;
    clouds.textContent = `${data.clouds.all}%`;
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
}

// Search event
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
        getWeather(city);
        searchInput.value = "";
    }
});

// Default city on load
getWeather("London");
