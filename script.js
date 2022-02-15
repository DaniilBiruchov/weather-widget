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


fetchDataPromise(urlWetherCurrent)
  .then((response) => {
    const data = JSON.parse(response)

    const city = data.name
    const windDeg = data.wind.deg
    const windSpeed = data.wind.speed
    const date = new Date(data.dt * 1000)
    const temp = data.main.temp - 273.15
    const countryCode = data.sys.country
    const description = data.weather[0].description
    const iconSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    console.log(data)
  })