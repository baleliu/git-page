const merge = require('webpack-merge');
const build = require('../webpack.build.js');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 生产模式
const mode= 'production';

module.exports = merge(build, {
    mode: mode,
    // devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode)
        }),
        new UglifyJSPlugin({
            // 如果使用 source map 请打开
            sourceMap: false
        }),
        // 取消
        // Error: webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.
        // new webpack.optimize.CommonsChunkPlugin({})
    ]
});