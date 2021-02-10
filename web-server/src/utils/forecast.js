const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=615f823db602bd429f401d49e45fe571&query=' + long +','+ lat + '&units=f'
    request({url: url, json: true}, (error, response) =>{

        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(response.body.error){
            callback('Unable to find location. Try another search', undefined)
        }

        else{
            callback(undefined,{
                temp: response.body.current.temperature,
                feels: response.body.current.feelslike
            })
        
        }
    
    })
}

module.exports = forecast

