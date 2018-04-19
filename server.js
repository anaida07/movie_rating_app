const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const session = require('express-session');
const config = require('./config/Config');
const passport = require('passport');
const serveStatic = require('serve-static');

const app = express();
const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(serveStatic(__dirname + "/dist"));
app.use(cors());

app.use(session({
  secret: config.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: false }
}))
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(mongoose.connect(config.DB));
mongoose.connection.once('open', () => {
  console.log('Connection has been made');
}).on('error', (error) => {
  console.log('connection error: '+ error);
})

// Include controllers
fs.readdirSync("controllers").forEach(function (file) {
  if(file.substr(-3) == ".js") {
    const route = require("./controllers/" + file)
    route.controller(app)
  }
})

router.get('/api/current_user', isLoggedIn, function(req, res) {
  if(req.user) {
    res.send({ current_user: req.user })
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
  console.log('error! auth failed')
}

router.get('/api/logout', function(req, res){
  req.logout();
  res.send();
});


router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

const port = process.env.PORT || 8081;
app.use('/', router);
var server = app.listen(port, function() {
  console.log(`api running on port ${port}`);
});

module.exports = server
