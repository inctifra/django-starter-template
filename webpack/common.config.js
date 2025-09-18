const path = require("path");
const BundleTracker = require("webpack-bundle-tracker");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "web",
  context: path.join(__dirname, "../"),
  entry: {
    project: path.resolve(__dirname, "../ifidel/static/js/project"),
    vendors: path.resolve(__dirname, "../ifidel/static/js/vendors"),
  },
  output: {
    path: path.resolve(__dirname, "../assets/webpack_bundles/"),
    publicPath: "/static/webpack_bundles/",
    filename: "js/[name]-[fullhash].js",
    chunkFilename: "js/[name]-[hash].js",
    clean: true,
  },
  plugins: [
    new BundleTracker({
      path: path.resolve(path.join(__dirname, "../assets")),
      filename: "webpack-stats.json",
    }),
    new WebpackBar({ name: "compiler" }),
    new MiniCssExtractPlugin({ filename: "css/[name].[contenthash].css" }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../ifidel/static/src/student/images"),
          to: "images/student",
        },
        {
          from: path.resolve(__dirname, "../ifidel/static/src/tutor/images"),
          to: "images/tutor",
        },
      ],
    }),
  ],
  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      {
        test: /\.[jt]sx?$/, // handles both .js/.jsx and .ts/.tsx
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[fullhash][ext][query]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name]-[fullhash][ext][query]",
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env", "autoprefixer", "pixrem"],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts"],
    alias: {
      "@student": path.resolve(
        __dirname,
        "../ifidel/static/src/student/images"
      ),
      "@tutor": path.resolve(__dirname, "../ifidel/static/src/tutor/images"),
      "@core": path.resolve(__dirname, "../ifidel/static/src/core/images"),
    },
  },
};
