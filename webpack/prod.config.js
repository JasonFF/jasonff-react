require('babel-polyfill');
var path = require("path");
var webpack = require("webpack");
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AddHashPlugin = require('./plugins/add-hash.js');

module.exports = {
    context: path.resolve(__dirname,'..'),
    entry: {
      main: './app/index.jsx',
      vendor:['react', 'redux','react-dom']
    },
    output: {
        path:"./dist/app",
        filename: 'bundle.[hash].js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            },
            __PRODUCTION__: true,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        }),
        new AddHashPlugin({
          from: path.join('./static', 'index.html'),
          to: path.join('./', 'index.html')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style','css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!less?outputStyle=expanded&sourceMap')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style','css')
            },
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules)/,
                loader: 'babel'
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
    }
};
