const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
module.exports = merge(common, {
    plugins: [
        new CleanWebpackPlugin(['dist']),
    ],
});
