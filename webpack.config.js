module.exports = {
  entry: "./app",
  output: {
    path: "./build",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:
        {
          presets:["react", "es2015"]
        }
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
    ]
  },
  devServer: {
    contentBase: "./build",
    inline: true
  },
  resolve: {
    extensions: ["", ".js", ".json", ".jsx", ".css", ".scss"]
  },
  externals: {
  'cheerio': 'window',
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
  }
  // node: {
  // fs: "empty",
  // net: "empty"
  // }
}
