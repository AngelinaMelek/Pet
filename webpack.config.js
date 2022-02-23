const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

const templateFiles = glob.sync(__dirname + "/src/*.html");

module.exports = (env) => {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
  ];

  templateFiles.length &&
    templateFiles.map((item) => {
      plugins.push(
        new HtmlWebpackPlugin({
          inject: false,
          filename: item,
          template: item,
        })
      );
    });

  return {
    target: "web",
    mode: "development",
    devtool: "inline-cheap-source-map",
    entry: {
      app: ["./src/js/app.js", "./src/scss/style.scss"],
      playlist: ["./src/js/movies/index.js"],
      panel: ["./src/js/panel.js"],
      todos: ["./src/js/todos.js"],
      chat: ["./src/js/chat.js"],
      players: ["./src/js/players.js"],
    },
    output: {
      path: __dirname + "/dist",
      filename: "js/[name].js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.ts$/,
          use: "awesome-typescript-loader",
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: false,
              },
            },
            { loader: "sass-loader", options: { sourceMap: true } },
          ],
        },
      ],
    },
    plugins,
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 4000,
      overlay: true,
      open: true,
      noInfo: true,
      stats: {
        modules: false,
      },
    },
  };
};
