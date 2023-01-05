//date/time info

let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  " Wednesday",
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
const formattedDay = days[now.getDay()];
const formattedMonth = months[now.getMonth()];
const time = now.toLocaleTimeString();
document.querySelector(
  "h2"
).innerText = `${time} ${formattedDay}, ${formattedMonth} ${date}, ${year}`;


function formatDate() {
  let newDate = `${formattedDay}, ${formattedMonth}, ${date}, ${year}.`;

  return days[day];
}
function formatDay(timestamp){
  let date=new Date(timestamp*1000);
  let day=date.getDay();
 let shortenedDay= ["Sun",
"Mon",
"Tues",
" Weds",
"Thurs",
"Fri",
"Sat"]
  return shortenedDay [day]
}

////api///

document.querySelector('#getWeather').addEventListener('click', getFetch)
function getFetch (){
  const city=document.querySelector('input').value;
  let url= `https://api.shecodes.io/weather/v1/current?query=${city}&key=t6306325f2a8c0563364baa3ffoc7c4c&units=metric`;

fetch(url)  
.then((res) => res.json())
  .then((data) =>{
  console.log(data)
  document.querySelector('h1').innerText=data.city;
  document.querySelector('#temperature').innerText=Math.round(data.temperature.current)
  document.querySelector('#humidity').innerText+=data.temperature.humidity
  document.querySelector('#description').innerText=data.condition.description
  document.querySelector('#windSpeed').innerText+=data.wind.speed

  document.querySelector('#iconCurrent').src=data.condition.icon_url
 celsiusTemperature=Math.round(data.temperature.current)
 getForecast(data.coordinates)
})
}

function searchLocation(position) {
  let apiKey = "t6306325f2a8c0563364baa3ffoc7c4c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;

  fetch(apiUrl)  
  .then((res) => res.json())
    .then((data) =>{
    console.log(data.coordinates)
    document.querySelector('h1').innerText=data.city
    document.querySelector('#temperature').innerText=Math.round(data.temperature.current)
    document.querySelector('#humidity').innerText+=data.temperature.humidity
    document.querySelector('#description').innerText=data.condition.description
    document.querySelector('#windSpeed').innerText+=data.wind.speed
    document.querySelector('#iconCurrent').src=data.condition.icon_url
    
    getForecast(data.coordinates)
    celsiusTemperature=Math.round(data.temperature.current)
    })  
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  
}

let currentLocationButton = document.querySelector("#getCurrentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

////////////////


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "t6306325f2a8c0563364baa3ffoc7c4c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast)
}









////temp convert////
function displayFahrenheitTemperature (event) {
  event.preventDefault()
  let fahrenheitTemperature=celsiusTemperature*1.8+32;
  let temperatureElement= document.querySelector('#temperature');
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature)
celsiusLink.classList.remove('active')
fahrenheitLink.classList.add('active')
}
let celsiusTemperature= null
let fahrenheitLink=document.querySelector('#fahrenheitLink')
fahrenheitLink.addEventListener('click', displayFahrenheitTemperature)

let celsiusLink=document.querySelector('#celsiusLink')

function displayCelsiusTemperature (event){
  event.preventDefault()
  let temperatureElement= document.querySelector('#temperature');
  temperatureElement.innerHTML=Math.round(celsiusTemperature)
  celsiusLink.classList.add('active')
fahrenheitLink.classList.remove('active')
}
celsiusLink.addEventListener('click', displayCelsiusTemperature)

/////forecast
function displayForecast(response) {
console.log(response.data.daily)
let forecast=response.data.daily
  let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML='Forecast"'
  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastday, index) {
    if (index<6){
    forecastHTML +=

      `<div class= 'col-2'>
      <div >
        <div class="weather-forecast-date">${formatDay(forecastday.time)}</div>
        <img id="forcastImage"
          src=${forecastday.condition.icon_url}
          alt=""
          width= '42'
        
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastday.temperature.minimum)}° </span>
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastday.temperature.maximum)}° </span>

        </div>
      </div></div>
  `;}
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// function getLocationWeather(){
 
//   let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;

// fetch(url)  
// .then((res) => res.json())
//   .then((data) =>{
//   console.log(data)
//   document.querySelector('h1').innerText=data.city
//   document.querySelector('#temperature').innerText=Math.round(data.temperature.current)
//   document.querySelector('#humidity').innerText=data.temperature.humidity
//   document.querySelector('#description').innerText=data.condition.description
//   document.querySelector('#iconCurrent').src=data.condition.icon_url
//   celsiusTemperature=Math.round(data.temperature.current)
// })
// }

