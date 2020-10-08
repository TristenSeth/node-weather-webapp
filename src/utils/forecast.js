const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aa9a4070a69abf229b5add8548b68638&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to fetch weather data.', undefined)
        } else if (body.error) {
            callback('Could not find location.', undefined)
        } else {
            const weather_description = body.current.weather_descriptions[0]
            const temp = body.current.temperature
            const real_feel = body.current.feelslike

            callback(undefined, {
                weather_description,
                temp,
                real_feel
            })
        }
    })
}

module.exports = forecast