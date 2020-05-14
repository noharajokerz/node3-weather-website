let request = require('request');



let forcase = (lat, long, callback) => {

    let urlCurrent = 'http://api.weatherstack.com/current?access_key=2267e242659e4a1eb4e26b3db3752218&query=' + lat + ',' + long;
    let strErr;

    let reqOption = {
         url : urlCurrent,
         json : true // sets body to JSON representation of value and adds Content-type: application/json header. Additionally, parses the response body as JSON.
     }

     request(reqOption, (error, forcaseData) => {

        if(error){
            console.error('Error xxx==> ',error);
            strErr = 'Unable to connect to forcast service';
            callback(strErr,undefined);
        } else {

            if (forcaseData.body.error) {

                console.log('Response Error x==> ',forcaseData.body.error);
                strErr ='Not found Location';
                callback(strErr,undefined);

            } else {
                
                let currentData = forcaseData.body.current;
                //console.log('\n== Current Weather data ==');
                //console.log(currentData);
                // console.log('Temperature is ' + currentData.temperature + 'degress , but it feel like ' + currentData.feelslike + ' degreess.' + 'summary weather is ' + currentData.weather_descriptions[0]);
                // callback( undefined, currentData);
                let text = 'Temperature is ' + currentData.temperature + 'degress , but it feel like ' + currentData.feelslike + ' degreess.' + 'summary weather is ' + currentData.weather_descriptions[0];
                callback( undefined, text);
            }

        }

     });
        

}

module.exports = forcase;