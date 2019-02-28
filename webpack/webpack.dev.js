const merge = require('webpack-merge');
const common = require('../webpack.common.js');
const webpack = require('webpack');

const mode= 'development';

module.exports = merge(common, {
    mode: mode,
    devtool: 'inline-source-map',
    devServer: {
        inline:true,
        port: 8000,
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode)
        })
    ],
});