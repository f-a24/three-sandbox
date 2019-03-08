module.exports = {
  mode: 'production',
  entry: `${__dirname}/src/index.ts`,
  output: {
    path: `${__dirname}/public`,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')({ grid: true })]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [],
  performance: {
    hints: false
  },
  externals: {
    THREE: 'three'
  },
  devServer: {
    contentBase: `${__dirname}/public`,
    port: 3000,
    hot: true,
    open: true
  }
};
