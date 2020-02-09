const weatherTextElement = document.querySelector(".js-weatherText");

const API_KEY = "d0b4913520e5b738d0909673a4717ddb";
const COORDS = "coords";

function fetchWeatherData(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
        .then(response => {return response.json();})
        .then(json => {
            const temperature = json.main.temp;
            const place = json.name;
            weatherTextElement.innerHTML = `${temperature} @ ${place}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS);
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    }
    else {
        const parsedCoords = JSON.parse(loadedCoords);
        fetchWeatherData(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init () {
    loadCoords();
}

init();