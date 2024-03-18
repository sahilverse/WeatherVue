// Weather API
const apiKey = "0a1bc36f6af7d57f9eee88e862bfe900";
const search = document.querySelector("#search");
const weatherIcon = document.getElementById("weather-img");

// Search Bar
search.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = search.value;
        if (city) {
            getWeather(city);
        }
    }
});

// Shows Date
let currentDate = new Date();
const date = document.getElementById("date");
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
let dayName = days[currentDate.getDay()];
let dateNumber = currentDate.getDate();
let monthName = months[currentDate.getMonth()];

let formattedDate = dayName + ", " + dateNumber + " " + monthName;
date.textContent = formattedDate;

// Default City
window.addEventListener("load", () => {
    const defaultCity = "Kathmandu";
    getWeather(defaultCity);
});

// Display Weather
async function getWeather(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
    );

    if (response.status == 404) {
        weatherIcon.src = "Images/404.png";
        document.getElementById("city").style.display = "none";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".w-c-container").style.display = "none";
        ument.querySelector(".temp-container").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".w-c-container").style.display = "flex";
        document.querySelector(".temp-container").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.getElementById("city").style.display = "block";

        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp);
        document.getElementById("max-temp").innerHTML = Math.round(
            data.main.temp_max
        );
        document.getElementById("humidity").innerHTML = data.main.humidity;
        document.getElementById("wind").innerHTML = data.wind.speed;

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloud.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }
    }
}

// Overlay button
const showWeather = () => {
    const overlay = document.querySelector(".overlay-container");
    const container = document.querySelector(".container");
    overlay.style.right = "-3000px";
    container.style.right = "0px";
    setTimeout(() => {
        overlay.style.display = "none";
    }, 1100);
};
