document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '4ddd17954db6f19d1f023328a8241499';
    const searchButton = document.getElementById('searchButton');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;

    searchButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        }
    });

    modeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });

    function fetchWeather(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    weatherInfo.innerHTML = '<p>Location not found. Please try again.</p>';
                }
            })
            .catch(error => {
                weatherInfo.innerHTML = '<p>Error fetching data. Please try again later.</p>';
            });
    }

    function displayWeather(data) {
        const {
            name,
            main,
            weather,
            wind,
            sys
        } = data;
        const date = new Date();
        const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();
        const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        weatherInfo.innerHTML = `
            <div class="weather-card">
                <h2>${name}</h2>
                <img src="${weatherIcon}" alt="Weather icon" class="weather-icon">
                <p>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</p>
                <p>Temperature: ${main.temp}°C</p>
                <p>Weather: ${weather[0].description}</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind Speed: ${wind.speed} m/s</p>
                <p>Sunrise: ${sunrise}</p>
                <p>Sunset: ${sunset}</p>
            </div>
        `;
    }
});