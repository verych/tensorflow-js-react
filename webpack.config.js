const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        'app.js': './src/app/index.jsx',
        'style': './src/style/index.scss',
    },
    output: {
        path: __dirname + '/public/',
        filename: "[name]" ,
        publicPath: ""
        //path: path.join(__dirname, './public/js/'),
        //filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: { sourceMap: true, url: true }
                  },
                  {
                    loader: "resolve-url-loader"
                  },
                  {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                  }
                ]
            }
            ,
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                {
                    loader: 'file-loader',
                    options: {name: 'img/[name].[ext]'}  
                }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin
    ],
    devtool: 'source-map'
};