const req = require('request');
const forecast = ({longitude, latitude}, callback) => {
    const url = 'https://api.darksky.net/forecast/dcfd8d1b0d4de2e1a97a7666af248166/'+ latitude +',' + longitude;
    req({ url, json: true }, (err, {body}) => {
        if (err) {
          callback('unable to connect weather service');
        } else if (body.error) {
            callback('some problem with cordinate passed.');
        } else {
            const dctemperature = ((body.currently.temperature - 32) * 5)/9;
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: dctemperature,
                rainProbability: body.currently.precipProbability,
            });
        }
      });
};

module.exports = forecast;