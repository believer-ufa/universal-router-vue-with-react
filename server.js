const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

const { publicPath } = config.output

app.use(webpackDevMiddleware(compiler, { publicPath }));
app.listen(8080, function () {
  console.log('Example app listening on port 8080!\n');
});
