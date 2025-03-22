const apiKey = 'a51baaa6f2214379b36212509252203 '; // Replace with your WeatherAPI key  
const apiBase = 'https://api.weatherapi.com/v1/current.json?';  

document.getElementById('get-weather').addEventListener('click', getWeather);  

function getWeather() {  
    const cityName = document.getElementById('city-input').value.trim();  
    if (!cityName) {  
        alert('Please enter a city name.');  
        return;  
    }  

    fetch(`${apiBase}key=${apiKey}&q=${cityName}&aqi=no`)  
        .then(response => {  
            if (!response.ok) {  
                throw new Error(`HTTP error! status: ${response.status}`);  
            }  
            return response.json();  
        })  
        .then(data => displayWeather(data))  
        .catch(error => {  
            console.error('Error fetching weather data:', error);  
            document.getElementById('weather-result').innerHTML =   
                `<p>Error: ${error.message}</p>`;  
        });  
}  

function displayWeather(data) {  
    const weatherResult = document.getElementById('weather-result');  
    const { temp_c, feelslike_c, condition } = data.current;  

    const weatherHTML = `  
        <h2>Current Weather in ${data.location.name}</h2>  
        <p>Temperature: ${temp_c}°C</p>  
        <p>Feels Like: ${feelslike_c}°C</p>  
        <p>Condition: ${condition.text}</p>  
    `;  
    
    weatherResult.innerHTML = weatherHTML;  
}  