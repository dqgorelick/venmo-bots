var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  cache: false,
  debug: false,
  bail: true,
  entry: [
    './src/app'
  ],
  output: {
    path: path.join(__dirname, '/public/dist'),
    filename: 'bundle.js',
    publicPath: '/public/dist/'
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin('main.css', {
      allChunks: true,
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: [
        'babel'
      ],
      include: path.join(__dirname, 'src')
    },
    {
        test: /\.html$/,
        loader: 'raw',
        exclude: /node_modules/
    },
    {
      test: /\.scss?$/,
      loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
    },
    {
      test: /\.(png|jpg|gif|jpeg)$/,
      loader: 'file-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', 'sass', 'css']
  }
};
