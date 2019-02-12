const path = require('path');

const isProd = false;

const webpackConfig = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "inject.js",
  },
  devServer: {
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      // {
      //   test: /\.pug$/,
      //   use: ['html-loader?attrs=false', 'pug-html-loader']
      // }
    ],
  },

  plugins: [],
};

if (isProd) {
  // Change things if production
}

module.exports = webpackConfig;
