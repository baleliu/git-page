const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const constant = require('./webpack/webpack.constant').constant;

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.module\.less$/,
                exclude: constant.NODE_MODULES,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    }, {
                        loader: "less-loader"
                    }],
                })
            },
            {
                test: /\.module\.css$/,
                exclude: constant.NODE_MODULES,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    }, {
                        loader: "less-loader"
                    }],
                })
            },

            {
                test: /^.((?!module).)*\.css$/,
                exclude: constant.NODE_MODULES,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                    }],
                })
            },
            {
                test: /^.((?!module).)*\.less$/,
                exclude: constant.NODE_MODULES,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                    }, {
                        loader: "less-loader"
                    }],
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({filename: 'css/[name][hash].css', allChunks: true}),
    ],
});
