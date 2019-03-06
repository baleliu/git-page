const merge = require('webpack-merge');
const build = require('../webpack.build.js');
const webpack = require('webpack');
const constant = require('./webpack.constant').constant;

// 开发模式
const mode= 'development';

module.exports = merge(build, {
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: constant.NODE_MODULES,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    }, {
                        loader: "less-loader"
                    }],
            },
        ]
    },
    mode: mode,
    devtool: 'inline-source-map',
    plugins: [
        // 定义环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode)
        })
    ],
});