const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'public');
const APP_DIR = path.join(__dirname, 'client');

module.exports = {
    entry: [
        `${APP_DIR}/app.jsx`,
    ],
    output: {
        path: BUILD_DIR,
        filename: 'js/bundle.js',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new ExtractTextPlugin({
            filename: 'css/styles.css',
            disable: false,
            allChunks: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.*(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                include: APP_DIR,
                use: 'babel-loader',
            },
            {
                test: /\.*(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: false,
                            },
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false,
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
                use: 'file-loader?name=img/[name].[ext]',
            },
            {
                test: /\.woff$|\.ttf$/,
                use: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            APP_DIR,
            'node_modules',
        ],
    },
};
