const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 入口文件
    entry: {
        app: './src/index.tsx',
        /*antd:[
            'antd'
        ]*/
    },
    // 输出到dist文件夹, 文件名字为bundle.js
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist'),
        chunkFilename: '[chunkhash:5].[name].js',
    },
    mode: 'production', //可选值有：production development
    module: {
        rules: [
            {
                test: /\.bundle\.tsx$/, // 通过文件名后缀自动处理需要转成bundle的文件
                include: /src/,
                exclude: /node_modules|bower_components/,
                use: [{
                    loader: 'bundle-loader',
                    options: {
                        name: '[name]',
                        lazy: true
                    }
                },]
            },
            {
                test: /\.(ts|tsx)?$/,
                // use: ['babel-loader', 'ts-loader'],
                loader: 'babel-loader!awesome-typescript-loader',
                exclude: /node_modules|bower_components/
            },
            {
                test: /\.md$/,
                // exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'raw-loader',
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
            /*{
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader', publicPath: '/'})
            },*/
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                    publicPath: '/'
                })
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html'
            }
        ),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {from: 'CNAME'},
            {from: 'static/**/*', to: 'static/'}
        ]),
        new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
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
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
}