const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.join(__dirname, 'public');
const APP_DIR = path.join(__dirname, 'client');

module.exports = {
    entry: [
        'eventsource-polyfill',
        'webpack-hot-middleware/client',
        `${APP_DIR}/app.jsx`,
    ],
    output: {
        path: BUILD_DIR,
        filename: 'js/bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
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
                use: [
                    {
                        loader: 'style-loader',
                        options: { hmr: true },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            import: true,
                            localIdentName: '[local]',
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
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
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            APP_DIR,
            'node_modules',
        ],
    },
};
