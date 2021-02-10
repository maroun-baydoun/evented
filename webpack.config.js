const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PATHS = {
  src: resolve(__dirname, "./src"),
  dist: resolve(__dirname, "./dist"),
};

module.exports = {
  mode: "production",
  entry: {
    evented: resolve(PATHS.src, "evented.ts"),
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    library: "evented-ts",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        resolve(__dirname, "dist"),
        resolve(__dirname, "types"),
      ],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
