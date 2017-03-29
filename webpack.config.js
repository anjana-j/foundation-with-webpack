const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin'); //VSCode Only

const PATHS = {
    //react: path.join(__dirname, 'node_modules/react/dist/react.min.js'),
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};


const config = {

    entry: {
        app: './src/assets/js/app.js',
        vendor: ['jquery','foundation-sites','./src/assets/js/vendor.js']
    },

    output: {
        path: PATHS.dist,
        filename: './assets/js/[name].min.js'
    },

    resolve: {
        modules: ['node_modules'],
        alias: {
            jquery: 'jquery/src/jquery',
        }
    },

    module: {
        rules: [

            /* styles loader */
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: "css-loader"
                        },

                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer', {
                                            browsers: ['last 2 versions', 'ie >= 9']
                                        })
                                    ];
                                }
                            }
                        },

                        {
                            loader: "resolve-url-loader"
                        },

                        {
                            loader: "sass-loader",
                            options : {
                                includePaths : ["./node_modules/foundation-sites/scss"]
                            }
                        }

                        
                    ],
                    fallback: "style-loader"
                })
            },


            /* fonts loader */
            {
                test: /\.svg$/,
                exclude: [path.resolve(__dirname, "./src/assets/images")],
                use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/'
            },
            {
                test: /\.ttf$/,
                use: 'url-loader?limit=10000&mimetype=application/x-font-ttf&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/'
            }, 
            {
                test: /\.otf$/,
                use: 'url-loader?limit=10000&mimetype=application/x-font-opentype&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/'
            }, 
            {
                test: /\.woff$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/'
            }, 
            {
                test: /\.woff2$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff2&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/'
            }, 
            {
                test: /\.eot$/,
                use: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/'
            }, 
            {
                test: /\.sfnt$/,
                use: 'url-loader?limit=10000&mimetype=application/font-sfnt&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/'
            },

            /* img loader */
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                exclude: [
                    path.resolve(__dirname, "./src/assets/fonts")
                ],
                use: "file-loader?name=./assets/images/[name].[ext]"
            }

        ]
    },

    plugins: [

        new webpack.optimize.UglifyJsPlugin(),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        new HtmlWebpackPlugin({
            title: 'Webpack Test E25',
            hash: true,
            chunks: ['vendor', 'app'],
            template: './src/index.html'
        }),
        
        new ExtractTextPlugin({
            filename: './assets/css/[name].min.css',
            disable: false,
            allChunks: true
        }),

        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/'
        }, { reload: false }),

        new BitBarWebpackProgressPlugin()
    ]
};


module.exports = config;
