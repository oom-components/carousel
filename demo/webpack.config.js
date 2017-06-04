module.exports = {
    context: __dirname,
    entry: './script.js',
    output: {
        filename: 'demo/script.dist.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}
