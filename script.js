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
        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${KEY}`)
            .then(response => {
                return response.json();
            })
            .then(response => {
                fetchWeatherData(response[0].name);
            })
      };
      
      const errorCallback = (error) => {
        alert(error);
      };
      
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

const searchButton = document.querySelector('button');
searchButton.addEventListener('click', () => {
    let input = document.getElementById('input').value;
    city = input;
    fetchWeatherData(city);
    input = '';
})


function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`)
    .then(response => {
        let error = document.querySelector(".error");
        error.remove();
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

        //humidity
        let humidity = document.getElementById('humidity');
        let humidityData = response.main.humidity;
        humidity.innerText = humidityData + '%';
        //temp min and max 
        let min = document.getElementById('min');
        let max = document.getElementById('max');
        let minData = response.main.temp_min;
        let maxData = response.main.temp_max;
        min.innerText = minData + '°C';
        max.innerText = maxData + '°C';

        //sunrise and sunset 
        let sunrise = document.getElementById('sunrise');
        let sunset = document.getElementById('sunset');
        
        let sunriseData = response.sys.sunrise;
        let sunsetData = response.sys.sunset;

        let sunriseFormat = new Date(sunriseData * 1000);
        let sunsetFormat = new Date(sunsetData * 1000);
        // Hours part from the timestamp
        let sunriseHours = sunriseFormat.getHours();
        let sunsetHours = sunsetFormat.getHours();
        // Minutes part from the timestamp
        let sunriseMinutes = "0" + sunriseFormat.getMinutes();
        let sunsetMinutes = "0" + sunsetFormat.getMinutes();

        // Will display time in 10:30:23 format
        let sunriseFormattedTime = sunriseHours + ':' + sunriseMinutes.substr(-2)
        let sunsetFormattedTime = sunsetHours + ':' + sunsetMinutes.substr(-2)

        sunrise.innerText = sunriseFormattedTime;
        sunset.innerText = sunsetFormattedTime;
    })

    .catch(error => {
        //description 
        let weatherDescription = document.getElementById('description');
        weatherDescription.innerText = '';
        //main temperature 
        let temp = document.getElementById('temperature');
        temp.innerText = '°C';
        //weather icon 
        let image = document.getElementById('image');
        image.src = `#`;

        //humidity
        let humidity = document.getElementById('humidity');
        humidity.innerText ='%';
        //temp min and max 
        let min = document.getElementById('min');
        let max = document.getElementById('max');
        min.innerText = '°C';
        max.innerText = '°C';

        //sunrise and sunset 
        let sunrise = document.getElementById('sunrise');
        let sunset = document.getElementById('sunset');
        sunrise.innerText ='';
        sunset.innerText = '';

        //city 
        let cityDisplay = document.getElementById('city');
        cityDisplay.innerText = 'unknown city';

        const errorDisplayMessage = document.createElement("div");
        errorDisplayMessage.classList.add("error");
        errorDisplayMessage.innerText = 'Please enter another location';

        let button = document.querySelector('.add-error');
        button.append(errorDisplayMessage);
    })
}

