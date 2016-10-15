var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };

var localIdentName = process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]';
var babelSettings = { presets: ['react', 'es2015', 'stage-0'] };
babelSettings.plugins = ['transform-decorators-legacy'];


var lessLoader;
var cssLoader;
var plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new ExtractTextPlugin('style.css'));
  lessLoader = ExtractTextPlugin.extract("style", "css!autoprefixer?browsers=last 2 versions!less");
  cssLoader = ExtractTextPlugin.extract('style', 'css?module&localIdentName=[hash:base64:5]');
} else {
  lessLoader = 'style!css?sourceMap!autoprefixer?browsers=last 2 versions!less';
  cssLoader = 'style!css?module&localIdentName=[name]__[local]__[hash:base64:5]';
}


module.exports = {
  entry: './entry',
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: babelSettings, exclude: /node_modules|es5/ },
      {
        test: /\.less$/,
        loader: lessLoader
      },
      { test: /\.css$/, loader: 'css/locals?module&localIdentName=' + localIdentName },
      { test: /\.(png|jpe?g)(\?.*)?$/, loader: 'url?limit=8182' },
      { test: /\.(svg|ttf|woff|eot)(\?.*)?$/, loader: 'file' }
    ]
  },
  plugins: plugins
};
