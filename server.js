const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const config = require('./config/Config');

const app = express();
const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

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

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
