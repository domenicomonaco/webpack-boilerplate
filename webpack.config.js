const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let mode = 'development'

if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

module.exports = {
    mode,
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },

    stats: { warnings: true },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    module: {
        rules: [{
                test: /\.(html)$/,
                use: ['html-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [{
                        loader: 'style-loader', // inject CSS to page
                    },
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            postcssOptions: {
                                plugins: []
                            }
                        }
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif|ico|webp)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        client: {
            overlay: false
        },
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
}