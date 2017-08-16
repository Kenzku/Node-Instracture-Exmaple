'use strict';
const express = require('express');
const util = require('util');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const env = require('./utils/env');
const compression = require('compression');
const favicon = require('serve-favicon');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./../webpack.config');
const fs = require('fs');
const SecurityHeader = require('./router/SecurityHeader');

const app = express();
app.set('trust proxy', 1);

const sessionProps = {
  name: 'session',
  secret: 'EibVZtnz+jmdvlrQ5uEo0knVmEovWMNhUR3b4kDsgis=',
  resave: false,
  saveUninitialized: true,
  httpOnly: false,
  rollingSessions: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000 //2 hours
  }
};

global.configuredSession = session(sessionProps); //Made global so we have easy access to it in the web socket leyer

app.use(compression()); // must be at the first use - serving gzip - really???
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(__dirname + '/../dist/favicon.ico'));

app.use(global.configuredSession);

/**
 * The BluemixStrategy is only invoked on the route which uses the passport.authenticate middleware.
 */
app.use(SecurityHeader);

/*close the download route, except for ioa mode*/
// const latestConfig = config.getLatestConfig();

process.env.NODE_ENV = env;

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler);

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', (req, res) => {
    let origIndexHtml = middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/real_index.html'), 'utf8');
    res.write(origIndexHtml);
    res.end();
  });

} else {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    let origIndexHtml = fs.readFileSync(path.join(__dirname, '../dist/real_index.html'), 'utf8');
    res.write(origIndexHtml);
    res.end();
  });
}

if (app.get('env') === 'dev' || env === 'dev') {
  // development error handler
}
/**
 * Production Settings
 */
if (app.get('env') === 'production' || env === 'production') {
  // production error handler
}

// custom 404 page
app.use(function (req, res) {
  //logger.info(util.format('reached 404: %s', util.inspect(req)));
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// custom 500 page
app.use(function (err, req, res) {
  console.log(util.format('reached 500: %s', err.stack));
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

module.exports = app;

