require('babel-polyfill');
var path = require("path");
var webpack = require("webpack");
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AddHashPlugin = require('./plugins/add-hash.js');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    context: path.resolve(__dirname,'..'),
    entry: {
      main: ['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:7777','./app/index.jsx'],
      vendor: ['react', 'redux', 'react-dom']
    },
    output: {
        filename: 'bundle.[hash].js',
        publicPath: 'dist/app'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            },
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
        }),
        new AddHashPlugin({
          from: path.join('./static', 'index.html'),
          to: path.join('./', 'index.html')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style','css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap')
            },
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    plugins: ['add-module-exports', "transform-decorators-legacy"],
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    resolve: {
        modulesDirectories: [
            'app',
            'node_modules'
        ],
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        port: 7777,
        hot: true,
        host:"0.0.0.0",
        historyApiFallback: {
          index: 'index.html'
        }
    }
};
