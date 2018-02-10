const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// http://handlebarsjs.com/

hbs.registerPartials('./views/partials')
app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'));
// middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\r\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static('./public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// app.get('/', (req, res) => {
//   // res.send('<h1>Hello Express!</h1>');
//   res.send({
//     name: 'Andrew',
//     likes: ['city', 'london']
//   });
// });
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'About page title',
    // currentYear: new Date().getFullYear(),
    welcomeMessage: 'Siemanko wariacie!'
  })
});

// app.get('/about', (req, res) => {
//   res.send('About page');
// });

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page title',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: '404 not found'
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port:3000');
});
