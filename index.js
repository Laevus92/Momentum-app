let currentLanguage = 'english';
let source = 'github';

//creating pop-up menu
const settingButton = document.querySelector('.settings_button');
const popUpMenu = document.querySelector('.pop__up__menu');

settingButton.addEventListener('click', () => {
    settingButton.classList.toggle('active');
    popUpMenu.classList.toggle('active');
})
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
        timesOfDay = 'night';
    } else {
        timesOfDay = 'evening' 
    }
    return timesOfDay
}

let placeholderTranslations = {
    english: ['[Enter name]', '[Enter city]', 'Minsk'],
    russian: ['[Введите имя]', '[Введите город]', 'Минск'],
    belorusian: ['[Увядзіце імя]', '[Увядзіце горад]', 'Минск'],
}

function checkInput(currentLanguage) {
    if (userName.value !== ''){
        greetingWidth.textContent = `${userName.value}`;
        userName.style.width = `${greetingWidth.offsetWidth + 3}px`;
     } else {
         greetingWidth.textContent = placeholderTranslations[currentLanguage][0];
         userName.style.width = `${greetingWidth.offsetWidth + 3}px`;
     }
}

//remember user name
userName.addEventListener('input', () => {
    checkInput(currentLanguage);
})

function checkBlur(currentLanguage) {
    if (userName.value === '' ){
        userName.placeholder = placeholderTranslations[currentLanguage][0];
        greetingWidth.textContent = placeholderTranslations[currentLanguage][0];
        userName.style.width = `${greetingWidth.offsetWidth + 3}px`
    }
}

userName.addEventListener('blur', () => {
    checkBlur(currentLanguage);
})

function setLocalStorage() {
    localStorage.setItem('name', userName.value);
    localStorage.setItem('language', currentLanguage);
    localStorage.setItem('width', greetingWidth.textContent);
    localStorage.setItem('city', city.value);
    localStorage.setItem('source', source);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if (localStorage.getItem('language')) {
        currentLanguage = localStorage.getItem('language');
        if (currentLanguage === 'russian') {
            russianLanguage.classList.add('active');
        } else if (currentLanguage === 'english') {
            englishLanguage.classList.add('active');
        } else { 
            belorusianLanguage.classList.add('active');
        }
        checkInput(currentLanguage);
        checkBlur(currentLanguage);
        checkCity(currentLanguage);
        getQuote(currentLanguage);
    } else {
        currentLanguage = 'english';
        englishLanguage.classList.add('active')
        checkInput(currentLanguage);
        checkBlur(currentLanguage);
        checkCity(currentLanguage);
        getQuote(currentLanguage);
    }

    if(localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name');
        greetingWidth.textContent = localStorage.getItem('width');
        userName.style.width = `${greetingWidth.offsetWidth + 3}px`;
    } else {
        checkInput(currentLanguage);
    }

    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        getWeather(currentLanguage);
    } else {
        city.value = placeholderTranslations[currentLanguage][2];
        getWeather(currentLanguage);
    }

    if (localStorage.getItem('source')) {
        source = localStorage.getItem('source');
        setBg();
    } else {
        source = 'github';
        setBg();
    }
  }
  window.addEventListener('load', () => {
    getLocalStorage()
  })  

//creating watches

const currentTime = document.querySelector('.current__time');
const currentDate = document.querySelector('.current__data')

let dataTranslation = {
    english: [{weekday: 'long', month: 'long', day: 'numeric'}, 'en-EN'],
    russian: [{weekday: 'long', month: 'long', day: 'numeric'}, 'ru-RU'],
    //belorusian: [{weekday: [], month: 'long', day: 'numeric'}, 'be-BY'],
}

 function showDate(currentLanguage) {
    if(currentLanguage === 'english' || currentLanguage === 'russian') {
        const date = new Date();
        const options = dataTranslation[currentLanguage][0];
        currentDate.textContent = date.toLocaleDateString(dataTranslation[currentLanguage][1], options);
    } else {
        const date = new Date();
        const options = dataTranslation['english'][0];
        let data = date.toLocaleDateString(dataTranslation['english'][1], options).split(' ');
        let dayOfWeek = {
            'Monday,' : 'Панядзелак,',
            'Tuesday,' : 'Аўторак,',
            'Wednesday,' : 'Серада,',
            'Thursday,' : 'Чацвер',
            'Friday,' : 'Пятніца',
            'Saturday,' : 'Субота',
            'Sunday,' : 'Нядзеля',
        }
        let months = {
            'January' : 'Студзень',
            'February' : 'Люты',
             'March' : 'Сакавік',
             'April' : 'Красавік',
             'May' : 'Травень',
             'June' : 'Чэрвень',
             'July' : 'Ліпень',
             'August' : 'Жнівень',
             'September' : 'Верасень',
             'October' : 'Кастрычнік',
             'November' : 'Лістапад',
             'December' : 'Снежань',             
        }
            if (data[0] in dayOfWeek && data[1] in months) {
                currentDate.textContent = `${dayOfWeek[data[0]]} ${data[2]} ${months[data[1]]}`
            } else {
                false;
            }
    }
}


let greetingTranslation = {
    english: ['Good morning,', 'Good afternoon,', 'Good evening,', 'Good night,'],
    russian: ['Доброе утро,', 'Добрый день,', 'Добрый вечер,', 'Доброй ночи,'],
    belorusian: ['Добрай раніцы,', 'Добры дзень,', 'Добры вечар,', 'Дабранач,' ],
}

function currentGreeting (currentLanguage) {
    let greetingTitle = `Good ${timeOfDay()},`;
    let index = 0;
    greetingTranslation['english'].forEach(element => {
        if ( element === greetingTitle) {
            index = greetingTranslation['english'].indexOf(element)
        }
    })
    greeting.textContent = greetingTranslation[currentLanguage][index]
}

function showTime() {
    const date = new Date();
    const time = date.toLocaleTimeString();
    currentTime.textContent = time;
    currentGreeting(currentLanguage);
    showDate(currentLanguage);
    setTimeout(showTime, 1000)
}

showTime();



// slider of images

let randomNumber = 0;
function getRandomNum(min, max) {
   let number = Math.floor((Math.random() * (max - min)) + min)
    return number = number.toString().padStart(2, '0')
}

randomNumber = getRandomNum(1, 20);

const sourceGithub = document.querySelector('.button.github');
const sourceFlickr = document.querySelector('.button.flickr');
const sourceUnsplash = document.querySelector('.button.unsplash');
const tags = document.querySelector('.settings.tags');
const natureTag = document.querySelector('.button.nature');
const spaceTag = document.querySelector('.button.space');
const cityTag = document.querySelector('.button.cities');
let tag = '';

natureTag.addEventListener('click', () => {
    natureTag.classList.add('active');
    spaceTag.classList.remove('active');
    cityTag.classList.remove('active');

    tag = 'nature';
    setBg();
})
spaceTag.addEventListener('click', () => {
    spaceTag.classList.add('active');
    cityTag.classList.remove('active');
    natureTag.classList.remove('active');

    tag = 'space';
    setBg();
})
cityTag.addEventListener('click', () => {
    cityTag.classList.add('active');
    spaceTag.classList.remove('active');
    natureTag.classList.remove('active');

    tag = 'city';
    setBg();
})

sourceGithub.addEventListener('click', () => {
    source = 'github';
    sourceGithub.classList.add('active');
    sourceFlickr.classList.remove('active');
    sourceUnsplash.classList.remove('active');
    tags.classList.remove('active')
    tag = '';
    setBg();
})

sourceFlickr.addEventListener('click', () => {
    source = 'flickr';
    sourceGithub.classList.remove('active');
    sourceFlickr.classList.add('active');
    sourceUnsplash.classList.remove('active');
    tags.classList.add('active');
    setBg();
})

sourceUnsplash.addEventListener('click', () => {
    source = 'unsplash';
    sourceGithub.classList.remove('active');
    sourceFlickr.classList.remove('active');
    sourceUnsplash.classList.add('active');
    tags.classList.add('active');
    setBg();
})
 

async function getImage() {
    if (source === 'unsplash') {
        if (tag === '') {
            tag = timeOfDay ()
        }
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=4bBeJ7mog7Gh_zh8eb0eveTwetEVzARpyyLUwpZd0ec`;
        const res = await fetch(url);
        const data = await res.json();

        const img = new Image();
        img.src = `${data.urls.regular}`; 
        img.onload = () => {      
            document.querySelector('body').style.backgroundImage = `url(${img.src})`
        } 
    } else if (source === 'flickr') {
        if (tag === '') {
            tag = timeOfDay ()
        }
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=074f354c06cc01cd38a3c9c758e1e7d0&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
        const res = await fetch(url);
        const data = await res.json();
        console.log (url)
        const img = new Image();
        img.src = `${data.photos.photo[getRandomNum(0, 99)].url_l}`; 
        img.onload = () => {      
            document.querySelector('body').style.backgroundImage = `url(${img.src})`
        } 
    }
} 

function setBg() {
    if (source === 'github') {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay()}/${randomNumber.toString().padStart(2, '0')}.jpg`; 
         img.onload = () => {      
        document.querySelector('body').style.backgroundImage = `url(${img.src})`
         }
    } else {
        getImage()
    }
};


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

let weatherForecastTranslations = {
    english: ['en', `Error! City is not found for `, 'Wind speed:', 'm/s', 'Humidity:'],
    russian: ['ru', `Ошибка! В списке городов отсутствует`, 'Скорость ветра:', 'м/с', 'Влажность:'],
    belorusian: ['be', `Пмылка! У спісе гарадоў адсутнічае`, 'Хуткасць ветру:', 'м/с', 'Вільготнасць:'],
}

async function getWeather(currentLanguage) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${weatherForecastTranslations[currentLanguage][0]}&appid=9f47cae05224360f9976638d9fc3148a&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (res['ok'] === false ) {
        weatherIcon.classList.remove(`${weatherIcon.classList[2]}`);
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = ''
        cityIsNotFound.textContent = `${weatherForecastTranslations[currentLanguage][1]} ${city.value}`;

    } else {
        cityIsNotFound.textContent = ''
        if (weatherIcon.classList[2] === undefined ) {
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        } else {
            weatherIcon.classList.remove(`${weatherIcon.classList[2]}`)
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        }
            weatherDescription.textContent = `${Math.floor(data.main.temp)}°C ${data.weather[0].description}`;
            wind.textContent = `${weatherForecastTranslations[currentLanguage][2]} ${Math.floor(data.wind.speed)} ${weatherForecastTranslations[currentLanguage][3]}`;
            humidity.textContent = `${weatherForecastTranslations[currentLanguage][4]} ${Math.floor(data.main.humidity)}%`
  }
}

city.addEventListener('change',  () => {
    getWeather(currentLanguage);
})

function checkCity(currentLanguage) {
    if (city.value === '') {
        city.placeholder = placeholderTranslations[currentLanguage][1]
    }
}

city.addEventListener('input', () => {
    checkCity(currentLanguage)
 })

 // quatation

const quote = document.querySelector('.quotes')
const author = document.querySelector('.author')
const reloadButton = document.querySelector('.refresh__button') 

async function getQuote(currentLanguage) {
    if (currentLanguage === 'english') {
        const url = 'https://api.quotable.io/random?maxLength=150';
        const res = await fetch(url);
        const data = await res.json();
        quote.textContent = `"${data.content}"`;
        author.textContent = data.author;        
    } else {
        const url = 'https://raw.githubusercontent.com/rolling-scopes-school/file-storage/random-jokes/quotes.json';
        const res = await fetch(url);
        const data = await res.json();
        let quoteNumb = getRandomNum(0, 99)
        quote.textContent = `"${data[quoteNumb].text}"`;
        author.textContent = data[quoteNumb].author;   
    }
}

let degrees = 0;

reloadButton.addEventListener('click', () => {
    degrees += 180;
    reloadButton.style.transform = `rotate(${degrees}deg)`
        quote.textContent = '';
    author.textContent = '';
    getQuote(currentLanguage);
})


//creating player

const playPauseButton = document.querySelector("body > header > div.player > div.player__buttons__bar > img:nth-child(2)");
const previousTrackButton = document.querySelector("body > header > div.player > div.player__buttons__bar > img:nth-child(1)");
const nextTrackButton = document.querySelector("body > header > div.player > div.player__buttons__bar > img:nth-child(3)");
let isPlay = false;
let trackNumber = 0;
const audio = new Audio();
let duration = 0;


function timeCode() {
    if( Math.floor(audio.currentTime) < 60) {
        document.querySelector('.current').textContent = `00:${Math.floor(audio.currentTime).toString().padStart(2, '0')}`
    } else {
        let minutes = Math.floor(Math.floor(audio.currentTime) / 60).toString().padStart(2, '0');
        let secundes = (Math.floor(audio.currentTime) % 60).toString().padStart(2, '0');
        document.querySelector('.current').textContent = `${minutes}:${secundes}`;
    }
    duration = (Number(playList[trackNumber].duration.slice(0, 2)) * 60) + Number(playList[trackNumber].duration.slice(3, 5));
    let timeLine = Math.floor((audio.currentTime / duration) * 100);
    document.querySelector('.progress').style.width = `${timeLine}%`;
    setTimeout(timeCode, 1000);
}

function playAudio() {
  audio.src = playList[trackNumber]['src'];
  document.querySelector('.name').textContent = `${playList[trackNumber]['title']}`;
  document.querySelector('.length').textContent = `${playList[trackNumber].duration}`;
  timeCode();
  audio.play();
}

function pauseAudio() {
    audio.pause();
}

playPauseButton.addEventListener('click', () => {
    if (isPlay === false) {
        isPlay = true;
        playPauseButton.setAttribute('src', './assets/svg/pause.svg');
        document.querySelectorAll('.play__list__item')[trackNumber].classList.add('item-active');
        playAudio();
    } else {
        isPlay = false;
        playPauseButton.setAttribute('src', './assets/svg/play.svg');
        pauseAudio();
    }
})

function nextTrack() {
    if (trackNumber >= 0 && trackNumber < (playList.length - 1)){
        isPlay = true;
        playPauseButton.setAttribute('src', './assets/svg/pause.svg');
        document.querySelectorAll('.play__list__item').forEach(element => {
            element.classList.remove('item-active')
        })
        trackNumber += 1
        document.querySelectorAll('.play__list__item')[trackNumber].classList.add('item-active');
        playAudio()
    } else {
        isPlay = true;
        playPauseButton.setAttribute('src', './assets/svg/pause.svg');
        document.querySelectorAll('.play__list__item').forEach(element => {
            element.classList.remove('item-active')
        })
        trackNumber = 0
        document.querySelectorAll('.play__list__item')[trackNumber].classList.add('item-active');
        playAudio()
    }
}

function previousTrack() {
    if (trackNumber <= (playList.length - 1) && trackNumber > 0){
        isPlay = true;
        playPauseButton.setAttribute('src', './assets/svg/pause.svg');
        document.querySelectorAll('.play__list__item').forEach(element => {
            element.classList.remove('item-active')
        })
        trackNumber -= 1
        document.querySelectorAll('.play__list__item')[trackNumber].classList.add('item-active');
        playAudio()
    } else {
        isPlay = true;
        playPauseButton.setAttribute('src', './assets/svg/pause.svg');
        document.querySelectorAll('.play__list__item').forEach(element => {
            element.classList.remove('item-active')
        })
        trackNumber = playList.length - 1
        document.querySelectorAll('.play__list__item')[trackNumber].classList.add('item-active');
        playAudio()
    }
}

audio.addEventListener('ended', () => {
    if (isPlay === true) {
        nextTrack()
    }
});

nextTrackButton.addEventListener('click', nextTrack);

previousTrackButton.addEventListener('click', previousTrack);

document.querySelector('.timeline').addEventListener('click', element => {
    if( isPlay === true) {
        audio.currentTime = (element.offsetX / (document.querySelector('.timeline').clientWidth) * duration);
    } else {
        false
    }
})

const volume = document.querySelector('.volume.icono-volumeMedium')
volume.addEventListener('click', () => {
    if (audio.volume !== 0) {
        audio.volume = 0;
        document.querySelector('.volume__control').setAttribute('src', './assets/svg/sound-mute.svg')
    } else {
        audio.volume = volumeLevel;
        document.querySelector('.volume__control').setAttribute('src', './assets/svg/sound.svg')
    }

})

let volumeLevel = 0.5;

document.querySelector('.volume-slider').addEventListener('click', element => {
    volumeLevel = element.offsetX / document.querySelector('.volume-slider').clientWidth
    audio.volume = volumeLevel;
    document.querySelector('.volume-percentage').style.width = `${volumeLevel * 100}%`
})

import playList from './assets/sounds/playList.js';

const playListContainer = document.querySelector('.play__list')

playList.forEach(track => {
    const li = document.createElement('li');
    li.classList.add('play__list__item')
    li.textContent = track['title'];
    playListContainer.append(li);
})

const track = document.querySelectorAll('.play__list__item');
track.forEach(track => {
    track.addEventListener('mouseover', element => {
        let trackArray = [];
        trackArray.push(Array.from(document.querySelectorAll('.play__list__item')));
        trackArray = trackArray.flat()
        let targetTrack = 0;
        for (let i = 0; i < trackArray.length; i++) {
            if (element.target === trackArray[i]) {
                targetTrack = i
            }
        }
       
        if (isPlay === true && targetTrack === trackNumber) {
            element.target.classList.add('pause')
        }
    })
    track.addEventListener('mouseout', element => {
        let trackArray = [];
        trackArray.push(Array.from(document.querySelectorAll('.play__list__item')));
        trackArray = trackArray.flat()
        let targetTrack = 0;
        for (let i = 0; i < trackArray.length; i++) {
            if (element.target === trackArray[i]) {
                targetTrack = i
            }
        }
       
        if (isPlay === true && targetTrack === trackNumber) {
            element.target.classList.remove('pause')
        }
    })

    track.addEventListener('click', element => {
        let trackArray = [];
        trackArray.push(Array.from(document.querySelectorAll('.play__list__item')));
        trackArray = trackArray.flat()
        let targetTrack = 0;
        for (let i = 0; i < trackArray.length; i++) {
            if (element.target === trackArray[i]) {
                targetTrack = i
            }
        }
        
        if (isPlay === false) {
            isPlay = true;
            playPauseButton.setAttribute('src', './assets/svg/pause.svg');
            trackNumber = targetTrack;
            document.querySelectorAll('.play__list__item')[trackNumber].classList.add('item-active');
            element.target.classList.add('pause')
            playAudio()
        } else if (isPlay === true && targetTrack !== trackNumber) {
            document.querySelectorAll('.play__list__item')[trackNumber].classList.remove('item-active')
            trackNumber = targetTrack;
            document.querySelectorAll('.play__list__item')[trackNumber].classList.add('item-active');
            playAudio()
        } else {
            isPlay = false;
            playPauseButton.setAttribute('src', './assets/svg/play.svg');
            document.querySelectorAll('.play__list__item')[trackNumber].classList.remove('item-active')
            trackNumber = targetTrack;
            element.target.classList.remove('pause');
            pauseAudio();
        }

    })
})

//translation 

const englishLanguage = document.querySelector('.button.lang_eng');
const russianLanguage = document.querySelector('.button.lang_rus');
const belorusianLanguage = document.querySelector('.button.lang_bel');



function translateToEnglish () {
    currentLanguage = 'english';
    checkInput(currentLanguage);
    checkBlur(currentLanguage);
    checkCity(currentLanguage);
    getWeather(currentLanguage);
    getQuote(currentLanguage);
}

function translateToRussian () {
    currentLanguage = 'russian';
    checkInput(currentLanguage);
    checkBlur(currentLanguage);
    checkCity(currentLanguage);
    getWeather(currentLanguage);
    getQuote(currentLanguage);
}

function translateToBelorussian () {
    currentLanguage = 'belorusian';
    checkInput(currentLanguage);
    checkBlur(currentLanguage);
    checkCity(currentLanguage);
    getWeather(currentLanguage);
    getQuote(currentLanguage);
}

englishLanguage.addEventListener('click', () => {
    if (currentLanguage !== 'english') {
        englishLanguage.classList.add('active');
        belorusianLanguage.classList.remove('active');
        russianLanguage.classList.remove('active');
        translateToEnglish()
    }
});

russianLanguage.addEventListener('click', () => {
    if (currentLanguage !== 'russian') {
        russianLanguage.classList.add('active');
        belorusianLanguage.classList.remove('active');
        englishLanguage.classList.remove('active');
        translateToRussian()
    }
});

belorusianLanguage.addEventListener('click', () => {
    if (currentLanguage !== 'belorusian') {
        belorusianLanguage.classList.add('active');
        russianLanguage.classList.remove('active');
        englishLanguage.classList.remove('active');
        translateToBelorussian()
    }
});
