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

  return newDate;
}

////temp convert////


////api///

document.querySelector('#getWeather').addEventListener('click', getFetch)
function getFetch (){
  const city=document.querySelector('input').value;
  let url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1a6432c5ca7b6f9b0bee45c98d54ea71`;

fetch(url)  
.then((res) => res.json())
  .then((data) =>{
  console.log(data)
  document.querySelector('h1').innerText=data.name
  document.querySelector('#temperature').innerText=Math.round(data.main.temp)
  document.querySelector('#humidity').innerText+=data.main.humidity
  document.querySelector('#description').innerText=data.weather[0].main

})
}


document.querySelector('#getWeather').addEventListener('click', getFetch)
function getLocationWeather(){
 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=1a6432c5ca7b6f9b0bee45c98d54ea71&units=metric`;

fetch(url)  
.then((res) => res.json())
  .then((data) =>{
  console.log(data)
  document.querySelector('h1').innerText=data.name
  document.querySelector('#temperature').innerText=Math.round(data.main.temp)
  document.querySelector('#humidity').innerText+=data.main.humidity
  document.querySelector('#description').innerText=data.weather[0].main

})
}








function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)  
  .then((res) => res.json())
    .then((data) =>{
    console.log(data)
    document.querySelector('h1').innerText=data.name
    document.querySelector('#temperature').innerText=Math.round(data.main.temp)
    document.querySelector('#humidity').innerText+=data.main.humidity
    document.querySelector('#description').innerText=data.weather[0].main
    })  
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#getCurrentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);
