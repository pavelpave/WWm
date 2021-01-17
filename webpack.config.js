let path = require('path');

let conf = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js',
    publicPath: 'build/',
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        },
        test: /\.js$/,
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            {
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          ],
        },
      },
    ],
  },
  // module: {
  //   rules: [
  //     {
  //       test: path.join(__dirname, '.js'),
  //       exclude: /(node_modules)/,
  //       loader: 'babel-loader',
  // options: {
  //   presets: [
  //     '@babel/preset-env',
  //     {
  //       plugins: ['@babel/plugin-proposal-class-properties'],
  //     },
  //   ],
  // },
  //     },
  //   ],
  // },
};

module.exports = conf;
