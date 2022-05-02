const nodeExternals = require("webpack-node-externals");
const path = require("path");

const js = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};

const serverConfig = {
  mode: "development",
  target: "node",
  entry: {
    index: path.resolve(__dirname, "src/server/index.js"),
  },
  module: {
    rules: [js],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
};

const clientConfig = {
  mode: "development",
  target: "web",
  entry: {
    main: path.resolve(__dirname, "src/browser/index.js"),
  },
  module: {
    rules: [js],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./public/bundle.js",
  },
};

module.exports = [serverConfig, clientConfig];