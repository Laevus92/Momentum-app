// creating greetings

const greeting = document.querySelector('.current__greeting');
const userName = document.querySelector('.user__name');
let greetingWidth = document.querySelector('.width__user__name__value');

function timeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timesOfDay = ''
    if (hours >= 6 && hours < 12) {
        timesOfDay = 'morning';
    } else if (hours >= 12 && hours < 18) {
        timesOfDay = 'afternoon';
    } else if (hours >= 0 && hours < 6) {
        timesOfDay = 'night ';
    } else {
        timesOfDay = 'evening' 
    }
    return timesOfDay
}

//remember user name
userName.addEventListener('input', () => {
    if (userName.value !== ''){
       greetingWidth.textContent = `${userName.value}`;
       userName.style.width = `${greetingWidth.offsetWidth + 3}px`;
    } else {
        greetingWidth.textContent = '[Enter name]';
        userName.style.width = `${greetingWidth.offsetWidth + 3}px`;
    }
    
})

userName.addEventListener('blur', () => {
    if (userName.value === '' ){
        userName.placeholder = '[Enter name]';
        greetingWidth.textContent = '[Enter name]';
        userName.style.width = `${greetingWidth.offsetWidth + 3}px`
    }
})

function setLocalStorage() {
    localStorage.setItem('name', userName.value);
    localStorage.setItem('width', greetingWidth.textContent);
    localStorage.setItem('city', city.value)
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name');
        greetingWidth.textContent = localStorage.getItem('width');
        userName.style.width = `${greetingWidth.offsetWidth + 3}px`;
    } else {
        userName.placeholder = '[Enter name]';
        greetingWidth.textContent = '[Enter name]'
        userName.style.width = `${greetingWidth.offsetWidth + 3}px`;
    }

    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        getWeather()
    } else {
        city.value = 'Minsk'
        getWeather()
    }
  }
  window.addEventListener('load', getLocalStorage)  

//creating watches

const currentTime = document.querySelector('.current__time');
const currentDate = document.querySelector('.current__data')

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    currentDate.textContent = date.toLocaleDateString('en-EN', options);
}

function showTime() {
    const date = new Date();
    const time = date.toLocaleTimeString();
    currentTime.textContent = time;
    greeting.textContent = `Good ${timeOfDay()}, `
    showDate();
    setTimeout(showTime, 1000)
}

showTime();

// slider of images
let randomNumber = 0;
function getRandomNum(min, max) {
    randomNumber = Math.floor((Math.random() * (max - min)) + min)
    return randomNumber = randomNumber.toString().padStart(2, '0')
}

getRandomNum(1, 20)


function setBg() {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay()}/${randomNumber.toString().padStart(2, '0')}.jpg`; 
    img.onload = () => {      
      document.querySelector('body').style.backgroundImage = `url(${img.src})`
    }; 
}

setBg();

const previousImage = document.querySelector('.previous__background')
const nextImage = document.querySelector('.next__background')

previousImage.addEventListener('click', () => {
    if (Number(randomNumber) <= 20 && Number(randomNumber) > 1) {
        randomNumber = (Number(randomNumber) - 1).toString().padStart(2, '0')
    } else {
        randomNumber = 20
    }
    setBg()
})

nextImage.addEventListener('click', () => {
    if (Number(randomNumber) >= 1 && Number(randomNumber) < 20) {
        randomNumber = (Number(randomNumber) + 1).toString().padStart(2, '0')
    } else {
        randomNumber = 1
    }
    setBg()
})

//weather forecast
const city = document.querySelector('.searching__string')
const weatherIcon = document.querySelector('.weather-icon');
const weatherDescription = document.querySelector('.description__container');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const cityIsNotFound = document.querySelector('.weather__error');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=9f47cae05224360f9976638d9fc3148a&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (res['ok'] === false ) {
        weatherIcon.classList.remove(`${weatherIcon.classList[2]}`);
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = ''
        cityIsNotFound.textContent = `Error! City is not found for ${city.value}`

    } else {
        cityIsNotFound.textContent = ''
        if (weatherIcon.classList[2] === undefined ) {
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        } else {
            weatherIcon.classList.remove(`${weatherIcon.classList[2]}`)
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        }
            weatherDescription.textContent = `${Math.floor(data.main.temp)}°C ${data.weather[0].description}`;
            wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`
  }
}

  getWeather()

  city.addEventListener('change', () => {
   getWeather()
})

city.addEventListener('input', () => {
    if (city.value === '') {
        city.placeholder = '[Enter city]'
    }
 })

 // quatation

const quote = document.querySelector('.quotes')
const author = document.querySelector('.author')
const reloadButton = document.querySelector('.refresh__button') 

async function getQuote() {
    const url = 'https://api.quotable.io/random';
    const res = await fetch(url);
    const data = await res.json();
    quote.textContent = `"${data.content}"`;
    author.textContent = data.author;
}

getQuote()

let degrees = 0;

reloadButton.addEventListener('click', () => {
    degrees += 180;
    reloadButton.style.transform = `rotate(${degrees}deg)`
        quote.textContent = '';
    author.textContent = '';
    getQuote()
})