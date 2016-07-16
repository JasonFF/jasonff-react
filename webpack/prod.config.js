require('babel-polyfill');
var path = require("path");
var webpack = require("webpack");
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
    context: path.resolve(__dirname,'..'),
    entry: {
      main: './app/index.jsx',
      vendor:['react', 'redux']
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
        function() {
            this.plugin("done", function(statsData) {
                var stats = statsData.toJson();
                if (!stats.errors.length) {
                    var htmlFileName = "index.html";
                    var html = fs.readFileSync(path.join('./', 'static/temp', htmlFileName), "utf8");
                    var htmlOutput = html.replace('bundle.js', stats.assetsByChunkName.main[0]).replace('main.css', stats.assetsByChunkName.main[1]);
                    fs.writeFileSync(path.join('./', htmlFileName), htmlOutput);
                }
            });
        },
        webpackIsomorphicToolsPlugin
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style','css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap')
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                loader: ExtractTextPlugin.extract('style','css!less')
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    plugins: ['transform-runtime', 'add-module-exports', "transform-decorators-legacy", ['antd', {'style':true}]],
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
    }
};
