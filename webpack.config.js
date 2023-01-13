/* eslint-disable */
const path = require("path");
const MinCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build"),
      assetModuleFilename: "assets/[name][ext]",
      clean: true,
    },
    module: {
        rules: [
            { test: /\.css$/, use: [MinCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader'},
            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
            {
              test: /\.pdf$/,
              use: [
                {
                  loader: 'url-loader',
                },
              ],
            },
            
            
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MinCssExtractPlugin()
    ]

};