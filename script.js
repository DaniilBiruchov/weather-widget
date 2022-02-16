function fetchDataPromise (url, method = 'GET') {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
  
      xhr.open(method, url)
  
      xhr.onload = () => {
        if (xhr.status == '200') {
          resolve(xhr.response)
        } else {
          reject(xhr.status + ' ' + xhr.statusText)
        }
      }
  
      xhr.onerror = () => {
        reject(xhr.status + ' ' + xhr.statusText)
      }
  
      xhr.send()
    })
  }

const key = '1354067d4c5e5ba7d6625f68d153937b'
const urlWetherCurrent = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${key}`
const urlWetherByDays = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${key}`
const CORRECTION_VALUE = 273.15
const hederElement = document.querySelector('.heder')
const mainElement = document.querySelector('.main')

function transformTime(time) {
    return time < 10 ? `0${time}` : time;
  }

fetchDataPromise(urlWetherCurrent)
  .then((response) => {
    const data = JSON.parse(response)

    const city = data.name
    const windDeg = data.wind.deg
    const windSpeed = Math.round(data.wind.speed)
    switch (windSpeed) {
        case 0:
            windSpeed == 'North';
            break;
        case windSpeed > 0 && windSpeed < 90:
            windSpeed == 'North-East';
            break;
        case 90:
            windSpeed == 'East';
            break;
        case windSpeed > 90 && windSpeed < 180:
            windSpeed == 'East-South';
            break;
        case 180:
            windSpeed == 'South';
            break;
        case windSpeed > 180 && windSpeed < 270:
            windSpeed == 'South-west';
            break;
        case 270:
            windSpeed == 'west';
            break;
        case windSpeed > 270 && windSpeed < 360:
            windSpeed == 'west-North';
            break;
        case 360:
            windSpeed == 'North';
            break;
    }
    const date = new Date(data.dt * 1000)
    const newDate = transformTime(date.getHours()) + ':' + transformTime(date.getMinutes())
    const temp = Math.round(data.main.temp - CORRECTION_VALUE)
    const countryCode = data.sys.country
    const feels_like = Math.round(data.main.feels_like - 273.15)
    const iconSrc = `http://openweathermap.org/img/wn/04n@2x.png`

    console.log(data)
    renderHeder({ city, windDeg, windSpeed, date, temp, countryCode, feels_like, iconSrc, newDate })
    
  })


  function templateWetherCurrent (weatherHeder) {
    const { city, windDeg, windSpeed, temp, countryCode, feels_like, iconSrc, newDate } = weatherHeder

      return `
			<div class="city">
				<h2>${city}, ${countryCode} </h2>
				<p>${newDate}</p>
			</div>
			<div class="temperature">
                <img src="${iconSrc}">
				<h1>${temp} ˚C</h1>
				<p>Feels like ${feels_like} ˚C</p>
			</div>
			<div class="wind">
				<p>${windDeg}</p>
				<p>${windSpeed} m/s</p>
			</div>
      `
  }

  function renderHeder (data) {
    hederElement.innerHTML += templateWetherCurrent(data)
  }

  fetchDataPromise(urlWetherByDays)
  .then((response) => {
    const data = JSON.parse(response)

    data.list.forEach((item, index) => {
      if (index % 8 == 0) {
          console.log(item)
        const date = new Date(item.dt * 1000)
        const newDate = transformTime(date.getDate()) + '.' + transformTime(date.getMonth()) + ' ' + transformTime(date.getHours()) + ' ' + 'p.m.'
        const temp = Math.round(item.main.temp - CORRECTION_VALUE)
        const iconSrc = `http://openweathermap.org/img/wn/03n@2x.png`
        renderMain({ temp, newDate, iconSrc })
      }
    })
  })

  function templateWetherByDays (weatherMain) {
    const { temp, newDate, iconSrc } = weatherMain

    return `
            <div class="day">
                <p><strong>${newDate}</strong></p>
                <img src="${iconSrc}">
                <p><strong>${temp} ˚C</strong></p>
            </div>
    `
  }

  function renderMain (data) {
    mainElement.innerHTML += templateWetherByDays(data)
  }