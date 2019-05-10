'use strict'

const path = require('path');
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const name = path.basename(__dirname);
const rootDir = `./src/${name}`;

const mainConfig = {
    name: name,
    entry: `${rootDir}/index.js`,
    externals: [
    ],
    output: {
        path: path.resolve('dist', name),
        filename: 'index.js'
    },
    module: {
        rules: [
            {test: /\.vue$/, use: 'vue-loader'}
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.resolve(rootDir)
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: name,
            filename: 'index.html',
            template: `${rootDir}/index.ejs`,
            minify: {
              collapseWhitespace: true,
              removeAttributeQuotes: true,
              removeComments: true
            },
            nodeModules: false
        })
    ],
    mode: 'production',
    target: 'web'
};

module.exports = () => {
    return mainConfig;
}
