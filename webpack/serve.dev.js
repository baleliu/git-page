const merge = require('webpack-merge');
const dev = require('./webpack.dev.js');

module.exports = merge(dev, {
    devServer: {
        inline: true,
        port: 8000,
        contentBase: './dist',
        hot: true
    },
});