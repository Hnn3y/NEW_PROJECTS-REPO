import axios from 'axios';
import inquirer from 'inquirer';

const API_KEY = '9582dc75b0254dafb7b22126250101'; 

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

    try {
        const response = await axios.get(url);
        const weather = response.data;
        console.log(`\nWeather in ${weather.location.name}, ${weather.location.country}:`);
        console.log(`Temperature: ${weather.current.temp_c}°C`);
        console.log(`Condition: ${weather.current.condition.text}`);
        showMenu();
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        showMenu();
    }
}

function showMenu() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'city',
            message: 'Enter a city name to get the weather (or type "exit" to quit):',
        }
    ]).then(answers => {
        if (answers.city.toLowerCase() === 'exit') {
            process.exit();
        } else {
            getWeather(answers.city);
        }
    });
}

showMenu();