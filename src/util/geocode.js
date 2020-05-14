let request = require('request');

let geoCode = (address, callback) => {

    // let geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoibm9oYXJham9rZXIiLCJhIjoiY2s5ZnVtMjlzMGgxMzNobzQwNGJ0dWdpOSJ9.WD-KbYG4NtZpfgSi9LzcOw&limit=1';
    let geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibm9oYXJham9rZXIiLCJhIjoiY2s5ZnVtMjlzMGgxMzNobzQwNGJ0dWdpOSJ9.WD-KbYG4NtZpfgSi9LzcOw&limit=1';
    let errStr = '';
    request({url: geoCodeURL, json: true},(error,response) => {

        if (error) {
            
            console.error(' Error => ',error);
            errStr = 'Unable to connect to location service'
            callback(errStr,undefined);
            
        } else {

            if (response.body.features.length === 0) {
                
                // console.log('Location not found.');
                callback('Location not found.',undefined);

            } else {
                
                let long = response.body.features[0].center[0];
                let lat = response.body.features[0].center[1];
                
                let returnData = {
                    latitude : lat,
                    longitude : long,
                    location : response.body.features[0].place_name
                };

                callback(undefined,returnData);
            }
            
        }

    });

}

module.exports = geoCode;