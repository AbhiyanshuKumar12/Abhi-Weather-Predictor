document.addEventListener('DOMContentLoaded',async ()=>{
    // this ensures that the code will be executed after tkhe execution of html file 
    const inputCity = document.getElementById("input-city");
    const weatherButton = document.getElementById("weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const showTemperature = document.getElementById("temperature");
    const showDescription = document.getElementById("description");
    const showError = document.getElementById("error-message"); 
    const API_KEY = "344844a235bc34a434a00eeafe9e4290";


    weatherButton.addEventListener('click',async ()=>{
        const city = inputCity.value.trim();
        if(!city)
            return;
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            displayError();  
        }
    })
    async function fetchWeatherData(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    function displayWeatherData(weatherData) {
        cityName.textContent = weatherData.name;
        showTemperature.textContent = `${weatherData.main.temp}°C`;
        showDescription.textContent = weatherData.weather[0].description;
        weatherInfo.classList.remove('hidden');
    }

    function displayError() {
        weatherInfo.classList.add('hidden');
        if (showError) {  // Ensure the element exists before trying to manipulate it
            showError.classList.remove('hidden');
        } else {
            console.error("Error element not found.");
        }
    }
})