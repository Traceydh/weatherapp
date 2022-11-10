let city = 'chiang mai'
const KEY = '07b455e1971cd1f6a070f7d09f4e2d4c'

const searchButton = document.querySelector('button');
searchButton.addEventListener('click', () => {
    let input = document.getElementById('input').value;
    city = input;
    fetchWeatherData()
})


function fetchWeatherData() {
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
        let desriptionDataEdit = descriptionData.charAt(0).toUpperCase() + descriptionData.slice(1);
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

