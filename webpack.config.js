var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(path.join(__dirname, "src")),
        publicPath: "/",
        filename: 'js/[name].min.js?[hash]'
    },
    // for preventing reloading routes when refreshing the page!
    devServer: {
        contentBase: '/',
        hot: true,
        inline: true,
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader?presets[]=es2015',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'index.test.html'
        })
    ]
};