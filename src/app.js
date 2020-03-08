const path = require('path');
const geoCode = require('./utlis/geocode');
const forecast = require('./utlis/forecast');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port  = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../templates/partial'));

app.get('', (req, res, next) => {
  res.render('index', {
    title: 'Weather App',
    createdBy: 'sanjeev'
  });
});

app.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About',
    createdBy: 'sanjeev'
  });
});
app.get('/help', (req, res, next) => {
  res.render('help', {
    title: 'Help',
    createdBy: 'sanjeev'
  });
});
app.get('/weather', (req, res, next) => {
  if (!req.query.address) {
    return res.send({
      message: 'please provide geo address'
    });
  }
  geoCode(req.query.address, (err, { longitude, latitude, placeName } = {}) => {
    if (err) {
      return res.send({
        message: err
      });
    }
    forecast(
      { longitude, latitude },
      (err, { summary, temperature, rainProbability } = {}) => {
        if (err) {
          return res.send({
            message: err
          });
        }
        return res.send({
          placeName,
          summary,
          temperature,
          rainProbability
        });
      }
    );
  });
});
app.get('/help/*', (req, res, next) => {
  res.render('404', {
    errorMessage: 'Help topic not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found'
  });
});
app.listen(port, () => {
  console.log('server started');
});
