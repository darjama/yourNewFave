const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./client-src/index.js",
  output: {
      path: path.resolve(__dirname, "public"),
      filename: "faveBundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
        resolve: { extensions: ['.js', '.jsx'] },
      }
    ]
  },
  node: {
    fs: 'empty'
  }
}