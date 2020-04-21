const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ca257e44a21a0f4344d2f69311ec6d79&query='+ latitude + ',' + longitude +'&units=s'
    request({ url, json: true }, (error, { body } = {} ) => {
        if(error){

            callback('Unable to connect with host.', undefined)
        }else if(body.error){

            callback('Location code incorrect.', undefined)
        }else{
                
            callback(undefined, {
                temperature: 'The weather is ' + body.current.weather_descriptions[0] + '. The current temperature is ' + body.current.temperature + ' and it feels like the temperature is ' + body.current.feelslike + ' but the humidity is ' + body.current.humidity + '.'
            })
        }
    })
}

module.exports = forecast