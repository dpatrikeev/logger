const path = require('path');
const express = require('express');
const webpack = require('webpack');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('../webpack.config.dev');
const router = require('./routes/routes');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './templates/'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

mongoose.connect('mongodb://localhost:27017/errorsLog');

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/api', router);

module.exports = app;
