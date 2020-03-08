const req = require('request');

const geo = (address, callback) => {
  const urlGeo =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoic2FuYmFnaCIsImEiOiJjazdnaWZ3MnkwMDFzM2xwODE4ZGZ2NTljIn0.N_4NpltJgDFzZbRGT_1Pwg&limit=1';
  req({ url: urlGeo, json: true }, (err, {body}) => {
    if (err) {
      callback('unable to connect geo code service');
    } else if (body.message) {
      callback(body.message);
    } else if (body.features.length == 0) {
      callback('no address found. please try another search.');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        placeName: body.features[0].place_name
      });
    }
  });
};

module.exports = geo;
