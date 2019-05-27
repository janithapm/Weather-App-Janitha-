request = require('request')

const forecasting = (longitude, latitude, callback) => {
    request(
        { 
            url : "https://api.darksky.net/forecast/65a8793abeffee0025fede15c6b4d1d2/"+longitude+","+latitude,
            json : true,
            rejectUnauthorized:false
        },
        (error, response) => {
            if(error){
                callback("can not access to the given location", undefined)
            }
            else
                callback(undefined, response)
        }
        )
}

module.exports  = {
    forecasting : forecasting
}