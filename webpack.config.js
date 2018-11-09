const webpack = require('webpack');

module.exports = {
    entry : './src/index.js',
    output : {
        path : __dirname + "/public",
        filename: 'bundle.js'
    },
    resolve : {
        extensions: ['*','.js']
    },
    module: {
        rules : [
            {
                test : /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                use:['babel-loader']
            }
        ]
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './public',
        hot: true
    },
    externals : {
        config : JSON.stringify({
            apiUrl: 'http://localhost:8080'
        })
    }
}