const express = require('express');
const app = express();
const config = require('./config/Db');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = Number(process.env.PORT || 5000);

// view engine
app.set('view engine', 'pug');
app.set('views', './views');

// body parser will receive post data from front end
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set global promise for mongoose
mongoose.Promise = global.Promise;

// db connection
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  res => {
    console.log('Database successfully connected');
  },
  err => {
    console.log(err);
  }
);
app.use(cors());

const proRoute = require('./router/product.router');
app.use('/', proRoute);

app.listen(PORT, function() {
  console.log(`Server is running on url http://localhost:${PORT}`);
});
