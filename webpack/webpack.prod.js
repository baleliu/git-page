const merge = require('webpack-merge');
const common = require('../webpack.common.js');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const mode= 'production';

module.exports = merge(common, {
    mode: mode,
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode)
        }),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
});