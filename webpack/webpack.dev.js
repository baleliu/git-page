const merge = require('webpack-merge');
const common = require('../webpack.common.js');
const webpack = require('webpack');

// 开发模式
const mode= 'development';

module.exports = merge(common, {
    mode: mode,
    devtool: 'inline-source-map',
    plugins: [
        // 定义环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode)
        })
    ],
});