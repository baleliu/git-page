const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const HelloWorldPlugin = require('./webpack/plugin/HelloWorldPlugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const constant = require('./webpack/webpack.constant').constant;
const config = require('./webpack/webpack.constant').config;

module.exports = {
    // 入口文件
    entry: {
        app: './src/index.tsx',
    },
    // 输出到dist文件夹, 文件名字为bundle.js
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        chunkFilename: 'js/[chunkhash:5].[name].js',
    },
    module: {
        rules: [
            {
                test: /\.bundle\.tsx$/, // 通过文件名后缀自动处理需要转成bundle的文件
                include: /src/,
                exclude: constant.NODE_MODULES,
                use: [{
                    loader: 'bundle-loader',
                    options: {
                        lazy: true
                    }
                },]
            },
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "awesome-typescript-loader"
                    }
                ],
                exclude: constant.NODE_MODULES
            },
            {
                test: /\.(md)$/,
                exclude: constant.NODE_MODULES,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'md/[hash].[ext]',
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: constant.NODE_MODULES,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                exclude: /src/,
                use: [
                    {loader: "style-loader",},
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: './static/[hash].[ext]'
                        }
                    }
                ]
            },

        ]
    },
    // 配置路径别名
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "Src": path.resolve("src"),
            "Component": path.resolve("src/component"),
            "View": path.resolve("src/view"),
            "Util": path.resolve("src/util"),
            "Style": path.resolve("src/style"),
            "Static": path.resolve("src/static"),
            "Service": path.resolve("src/service")
        },
    },
    // 插件配置
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            title: "猫DOC",
            template: './public/index.html',
                filename: 'index.html'
            }
        ),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {from: 'CNAME'},
            // {from: 'public/404.html'}
        ]),
        new HelloWorldPlugin("liu wen tao"),
        new webpack.DefinePlugin({
            'process.env.BASE_URL': JSON.stringify(config.BASE_URL)
        })
    ],
    optimization: {

        runtimeChunk: {
            // 运行时缓存 更具entryPoint 生成
            name: entryPoint => `runtime.${entryPoint.name}`
        },
        splitChunks: {
            cacheGroups: {
                // 包含所有被其他入口(entryPoints)共享的代码
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2,
                    priority: 20
                },
                // 所有来自node_modules的代码
                vendors: {
                    test: constant.NODE_MODULES,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
}