let city = 'chiang mai'
const KEY = '07b455e1971cd1f6a070f7d09f4e2d4c'

getUserLocation()
getUserDate()

function getUserDate() {
    const dateData = new Date().toDateString();
    let date = document.getElementById('date')
    date.innerText = dateData;
}

//get location 
function getUserLocation() {
    const successCallback = (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log(position, lat, lon);
        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${KEY}`)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response, response[0].name);
                fetchWeatherData(response[0].name);
            })
      };
      
      const errorCallback = (error) => {
        alert(error);
      };
      
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
//retrieve API for current location data 
//place into divs 
//display 

const searchButton = document.querySelector('button');
searchButton.addEventListener('click', () => {
    let input = document.getElementById('input').value;
    city = input;
    fetchWeatherData(city);
})


function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`)
    .then(response => {
        return response.json();
    })
    .then(response => {
        //city 
        let cityDisplay = document.getElementById('city');
        cityDisplay.innerText = response.name;
        //description 
        let weatherDescription = document.getElementById('description');
        let descriptionData =  response.weather[0].description;
        let feelsData = response.main.feels_like;
        let desriptionDataEdit = descriptionData.charAt(0).toUpperCase() + descriptionData.slice(1) + `. Feels like ${feelsData}°C`;
        weatherDescription.innerText = desriptionDataEdit;
        //main temperature 
        let temp = document.getElementById('temperature');
        temp.innerText = response.main.temp + '°C';
        //weather icon 
        let image = document.getElementById('image');
        let iconDay = response.weather[0].icon;
        let iconNight = iconDay.slice(0,-1) + 'n';
        image.src = `http://openweathermap.org/img/wn/${iconNight}@2x.png`
        
        console.log(response)
    })
}

