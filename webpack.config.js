const path = require('path');
const publicDir = 'public';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, publicDir),
        filename: 'bundle.js',
    },
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, publicDir),
        compress: true,
        port: 8080,
        host: '0.0.0.0',
    },
    resolve: {
        extensions: [ '.js', '.jsx' ],
    },
};
