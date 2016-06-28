var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});
var
  babel_plugins = ["transform-decorators-legacy", "transform-runtime"],
  babel_presets = ["es2015", "stage-0", "react"];

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'bootstrap-loader',
    'eventsource-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './js/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
    filename: 'bundle.js',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin,
    new ExtractTextPlugin('app.css'),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
    })
  ],
  module: {
    loaders: [
      {test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery'},
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {plugins: babel_plugins, presets: babel_presets}},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader')}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
