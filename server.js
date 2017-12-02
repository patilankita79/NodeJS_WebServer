//load express
const express = require('express');

//handlebars
const hbs = require('hbs');

const fs = require('fs');

var app = express();

// adding support for partials
  hbs.registerPartials(__dirname + '/views/partials');

// Tell express that, you would use hbs view engine
app.set('view engine', 'hbs');

//express uses view directory by default for templates, we will make template for about page

/*
Middlewares -> with app.use() middlewares are registered.
*/



app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// If we don't call next, it will stop everything after it from executing
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// To serve static html pages
// Reading from static directory
app.use(express.static(__dirname +  '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

/*
setting http route handlers
*/

//register handler using app.get
app.get('/', (req, res) => {

  // if the user makes a request, he will get response for the http request
  //response for the http request
  // res.send('<h1>Hello Express</h1>');

  // res.send({
  //   name: 'Ankita'
  // })
  res.render('home.hbs', {
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });

});

// /bad -> send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage:'Unable to handle request'
  });
});

// bind application to port on a machine
app.listen(3000);
