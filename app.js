const express = require('express');
const rp = require('request-promise');
const app = express();

const apiKey = '01c0e3480c04b5d33e701401bb685e94';

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});

app.post('/', (req, res) => {
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  rp(url)
    .then((body) => {
      const weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render('index', {
          weather: null,
          error: 'Error, please try again',
        });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', { weather: weatherText, error: null });
      }
    })
    .catch((err) => {
      res.render('index', { weather: null, error: 'Error, please try again' });
    });
});

app.listen(3000, () => {
  console.log('Server has started');
});
