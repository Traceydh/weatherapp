let city = 'chiang mai'
const KEY = '07b455e1971cd1f6a070f7d09f4e2d4c'

const searchButton = document.querySelector('button');
searchButton.addEventListener('click', () => {
    let input = document.getElementById('input').value;
    CITY = input;
    let cityDisplay = document.getElementById('city');
    cityDisplay.innerText = input;
    fetchWeatherData()
    //change location text 
    //fetch data with location input 
})


function fetchWeatherData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`)
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response)
        console.log(response.main.feels_like)
        console.log(response.main.humidity)
        console.log(response.main.temp)
        console.log(response.weather[0].description)
    })
}

