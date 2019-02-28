const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    // 入口文件
    entry: {
        app: './src/index.tsx',
    },
    // 输出到dist文件夹, 文件名字为bundle.js
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    mode: 'production', //可选值有：production development
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader','ts-loader'],
                exclude: /node_modules|bower_components/
            },
            {
                test: /\.md$/,
                // exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'html-loader',
                   /* options:{
                        // limit:0,//限制打包图片的大小：
                        //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                        name:'static/[name]-[hash:8].[ext]',//images:图片打包的文件夹；
                        //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                        //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
                    }*/
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: "[path][name]-[local]-[hash:base64:5]"
                    }
                }]
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
                            limit: 8192
                        }
                    }
                ]
            },

        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html'
            }
        ),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: 'CNAME' },
        ]),
    ],
}