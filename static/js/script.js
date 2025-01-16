document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');
    const cityName = document.getElementById('city-name');
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });

    function fetchWeather(city) {
        fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city: city }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showError();
            } else {
                showWeather(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError();
        });
    }

    function showWeather(data) {
        cityName.textContent = data.city;
        weatherIcon.src = `http://openweathermap.org/img/w/${data.icon}.png`;
        temperature.textContent = `Temperature: ${data.temperature}°C`;
        description.textContent = `Description: ${data.description}`;
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
});