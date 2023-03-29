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

let settingsTranslation = {
    english: ['Select language:', 'Select source of backgrounds:', 'Select Tag:', 'English', 'Russian', 'Belorussian', 'Nature', 'Space', 'Cities', 'Player', 'Weather', 'Time', 'Date', 'Greeting', 'Quote'],
    russian: ['Выберите язык:', 'Выберите источник фонов:', 'Выберите тег:', 'Английский', 'Русский', 'Белорусский', 'Природа', 'Космос', 'Города', 'Плеер', 'Погода ', 'Время', 'Дата', 'Приветствие', 'Цитата'],
    belorusian: ['Выберыце мову:', 'Выберыце крыніцу фонаў:', 'Выберыце тэг:', 'Англійская', 'Руская', 'Беларуская', 'Прырода', 'Космас', 'Гарады', 'Прайгравальнік', "Надвор'е", 'Час', 'Дата', 'Прывітанне', 'Цытата'] ,
}


function checkInput(currentLanguage) {
    if (userName.value !== ''){
        greetingWidth.textContent = `${userName.value}`;
        userName.style.width = `${greetingWidth.offsetWidth + 3}px`;
     } else {
         userName.setAttribute('placeholder', '[Enter name]')
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
    translateSettings()
    setBg();
})

sourceUnsplash.addEventListener('click', () => {
    source = 'unsplash';
    sourceGithub.classList.remove('active');
    sourceFlickr.classList.remove('active');
    sourceUnsplash.classList.add('active');
    tags.classList.add('active');
    translateSettings()
    setBg();
})
 

async function getImage() {
    if (source === 'unsplash') {
        if (tag === '') {
            tag = timeOfDay()
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
            tag = timeOfDay()
        }
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=074f354c06cc01cd38a3c9c758e1e7d0&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
        const res = await fetch(url);
        const data = await res.json();
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
function translateSettings() {
    if (Array.from(tags.classList).includes('active')) {
        document.querySelector("body > div > div.settings.language > div.title").textContent = settingsTranslation[currentLanguage][0];
        document.querySelector("body > div > div.settings.background__sources > div.title").textContent = settingsTranslation[currentLanguage][1];
        document.querySelector("body > div > div.settings.tags.active > div.title").textContent = settingsTranslation[currentLanguage][2];
        englishLanguage.textContent = settingsTranslation[currentLanguage][3];
        russianLanguage.textContent = settingsTranslation[currentLanguage][4];
        belorusianLanguage.textContent = settingsTranslation[currentLanguage][5];
        natureTag.textContent = settingsTranslation[currentLanguage][6];
        spaceTag.textContent = settingsTranslation[currentLanguage][7];
        cityTag.textContent = settingsTranslation[currentLanguage][8];
        widgetPlayer.textContent = settingsTranslation[currentLanguage][9];
        widgetWeather.textContent = settingsTranslation[currentLanguage][10];
        widgetTime.textContent = settingsTranslation[currentLanguage][11];
        widgetDate.textContent = settingsTranslation[currentLanguage][12];
        widgetGreeting.textContent = settingsTranslation[currentLanguage][13];
        widgetQuote.textContent = settingsTranslation[currentLanguage][14];
    } else {
        document.querySelector("body > div > div.settings.language > div.title").textContent = settingsTranslation[currentLanguage][0];
        document.querySelector("body > div > div.settings.background__sources > div.title").textContent = settingsTranslation[currentLanguage][1];
        englishLanguage.textContent = settingsTranslation[currentLanguage][3];
        russianLanguage.textContent = settingsTranslation[currentLanguage][4];
        belorusianLanguage.textContent = settingsTranslation[currentLanguage][5];
        natureTag.textContent = settingsTranslation[currentLanguage][6];
        spaceTag.textContent = settingsTranslation[currentLanguage][7];
        cityTag.textContent = settingsTranslation[currentLanguage][8];
        widgetPlayer.textContent = settingsTranslation[currentLanguage][9];
        widgetWeather.textContent = settingsTranslation[currentLanguage][10];
        widgetTime.textContent = settingsTranslation[currentLanguage][11];
        widgetDate.textContent = settingsTranslation[currentLanguage][12];
        widgetGreeting.textContent = settingsTranslation[currentLanguage][13];
        widgetQuote.textContent = settingsTranslation[currentLanguage][14];
    }
}

function translateToEnglish() {
    currentLanguage = 'english';
    checkInput(currentLanguage);
    checkBlur(currentLanguage);
    checkCity(currentLanguage);
    getWeather(currentLanguage);
    getQuote(currentLanguage);
    translateSettings()
}

function translateToRussian() {
    currentLanguage = 'russian';
    checkInput(currentLanguage);
    checkBlur(currentLanguage);
    checkCity(currentLanguage);
    getWeather(currentLanguage);
    getQuote(currentLanguage);
    translateSettings()
}

function translateToBelorussian() {
    currentLanguage = 'belorusian';
    checkInput(currentLanguage);
    checkBlur(currentLanguage);
    checkCity(currentLanguage);
    getWeather(currentLanguage);
    getQuote(currentLanguage);
    translateSettings()
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

const widgetPlayer = document.querySelector('.button.player');
const widgetWeather = document.querySelector('.button.weather');
const widgetTime = document.querySelector('.button.time');
const widgetDate = document.querySelector('.button.date');
const widgetGreeting = document.querySelector('.button.greeting');
const widgetQuote = document.querySelector('.button.quote');
let playerVisibility = 'visible';
let weatherVisibility = 'visible';
let timeVisibility = 'visible';
let dateVisibility = 'visible';
let greetingVisibility = 'visible';
let quoteVisibility = 'visible';

function hidePlayer() {
    if (playerVisibility !== 'visible') {
        document.querySelector("body > header > div.player").classList.add('hidden');
        widgetPlayer.classList.add('active');
    } else {
        document.querySelector("body > header > div.player").classList.remove('hidden');
        widgetPlayer.classList.remove('active');
    }
}

function hideWeather() {
    if (weatherVisibility !== 'visible') {
        document.querySelector("body > header > div.weather").classList.add('hidden');
        widgetWeather.classList.add('active');
    } else {
        document.querySelector("body > header > div.weather").classList.remove('hidden');
        widgetWeather.classList.remove('active');
    }
}

function hideTime() {
    if (timeVisibility !== 'visible') {
        document.querySelector('.current__time').classList.add('hidden');
        widgetTime.classList.add('active')
    } else {
        document.querySelector('.current__time').classList.remove('hidden');
        widgetTime.classList.remove('active')
    }
}

function hideDate() {
    if (dateVisibility !== 'visible') {
        document.querySelector('.current__data').classList.add('hidden');
        widgetDate.classList.add('active')
    } else {
        document.querySelector('.current__data').classList.remove('hidden');
        widgetDate.classList.remove('active')
    }
}

function hideGreeting() {
    if (greetingVisibility !== 'visible') {
        document.querySelector("body > main > div.time__calendar__greetings > div.greeting").classList.add('hidden');
        widgetGreeting.classList.add('active')
    } else {
        document.querySelector("body > main > div.time__calendar__greetings > div.greeting").classList.remove('hidden');
        widgetGreeting.classList.remove('active')
    }
}

function hideQuote() {
    if (quoteVisibility !== 'visible') {
        document.querySelector('.wrapper').classList.add('hidden');
        widgetQuote.classList.add('active')
    } else {
        document.querySelector('.wrapper').classList.remove('hidden');
        widgetQuote.classList.remove('active')
    }
}

widgetPlayer.addEventListener('click', () => {
    if (playerVisibility === 'visible') {
        playerVisibility = 'hide';
    } else {
        playerVisibility = 'visible';
    }
    hidePlayer()
})

widgetWeather.addEventListener('click', () => {
    if (weatherVisibility === 'visible') {
        weatherVisibility = 'hide';
    } else {
        weatherVisibility = 'visible';
    }
    hideWeather();
})

widgetTime.addEventListener('click', () => {
    if (timeVisibility === 'visible') {
        timeVisibility = 'hide';
    } else {
        timeVisibility = 'visible';
    }
    hideTime()
})

widgetDate.addEventListener('click', () => {
    if (dateVisibility === 'visible') {
        dateVisibility = 'hide';
    } else {
        dateVisibility = 'visible';
    }
    hideDate()
})

widgetGreeting.addEventListener('click', () => {
    if (greetingVisibility == 'visible') {
        greetingVisibility = 'hide';
    } else {
        greetingVisibility = 'visible';
    }
    hideGreeting()
})

widgetQuote.addEventListener('click', () => {
    if (quoteVisibility == 'visible') {
        quoteVisibility = 'hide';
    } else {
        quoteVisibility = 'visible';
    }
    hideQuote()
})

function setLocalStorage() {
    localStorage.setItem('name', userName.value);
    localStorage.setItem('language', currentLanguage);
    localStorage.setItem('width', greetingWidth.textContent);
    localStorage.setItem('city', city.value);
    localStorage.setItem('source', source);
    localStorage.setItem('tag', tag);
    localStorage.setItem('playerVisibility', playerVisibility);
    localStorage.setItem('weatherVisibility', weatherVisibility);
    localStorage.setItem('timeVisibility', timeVisibility);
    localStorage.setItem('dateVisibility', dateVisibility);
    localStorage.setItem('greetingVisibility', greetingVisibility);
    localStorage.setItem('quoteVisibility', quoteVisibility);
  }

  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    
    if (localStorage.getItem('tag') ) {
        tag = localStorage.getItem('tag');
        if (tag === 'nature') {
            natureTag.classList.add('active');
        } else if (tag === 'space') {
            spaceTag.classList.add('active');
        } else {
            cityTag.classList.add('active');
        }
    } else {
        tag = ''
    }

    if (localStorage.getItem('source')) {
        source = localStorage.getItem('source');
        if (source ==='unsplash') {
            sourceUnsplash.classList.add ('active');
            tags.classList.add('active');
            document.querySelector("body > div > div.settings.tags.active > div.title").textContent = settingsTranslation[currentLanguage][2];
        } else if (source ==='flickr') {
            sourceFlickr.classList.add ('active');
            tags.classList.add('active');
            document.querySelector("body > div > div.settings.tags.active > div.title").textContent = settingsTranslation[currentLanguage][2];
        } else {
            sourceGithub.classList.add('active');
            tags.classList.remove('active');
        }
        setBg();
    } else {
        source = 'github';
        sourceGithub.classList.add('active');
        tags.classList.remove('active');
        setBg();
    }

    if (localStorage.getItem('language')) {
        currentLanguage = localStorage.getItem('language');
        if (currentLanguage === 'russian') {
            russianLanguage.classList.add('active');
            translateSettings()
        } else if (currentLanguage === 'english') {
            englishLanguage.classList.add('active');
            translateSettings()
        } else { 
            belorusianLanguage.classList.add('active');
            translateSettings()
        }
        checkInput(currentLanguage);
        checkBlur(currentLanguage);
        checkCity(currentLanguage);
        getQuote(currentLanguage);
    } else {
        currentLanguage = 'english';
        englishLanguage.classList.add('active')
        getQuote(currentLanguage)
        translateSettings()
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

    if (localStorage.getItem('playerVisibility')) {
        playerVisibility = localStorage.getItem('playerVisibility');
        hidePlayer()
    } else {
        playerVisibility = 'visible';
        hidePlayer()
    }

    if (localStorage.getItem('weatherVisibility')) {
        weatherVisibility = localStorage.getItem('weatherVisibility');
        hideWeather()
    } else {
        weatherVisibility = 'visible';
        hideWeather()
    }

    if (localStorage.getItem('timeVisibility')) {
        timeVisibility = localStorage.getItem('timeVisibility');
        hideTime()
    } else {
        timeVisibility = 'visible';
        hideTime()
    }

    if (localStorage.getItem('dataVisibility')) {
        dateVisibility = localStorage.getItem('dataVisibility');
        hideDate()
    } else {
        dateVisibility = 'visible';
        hideDate()
    }

    if (localStorage.getItem('greetingVisibility')) {
        greetingVisibility = localStorage.getItem('greetingVisibility');
        hideGreeting()
    } else {
        greetingVisibility = 'visible';
        hideGreeting()
    }

    if (localStorage.getItem('quoteVisibility')) {
        quoteVisibility = localStorage.getItem('quoteVisibility');
        hideQuote()
    } else {
        quoteVisibility = 'visible';
        hideQuote()
    }
  }
  window.addEventListener('load', () => {
    setTimeout( () => {
        document.getElementsByTagName("body")[0].style.opacity = "1";
    }, 700);
    getLocalStorage()
}) 
