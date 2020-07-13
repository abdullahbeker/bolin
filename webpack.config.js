const path = require('path')
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AutoPrefixer = require('autoprefixer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  plugins: [new HotModuleReplacementPlugin(), new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  mode: 'production',
  entry: path.resolve(__dirname, 'assets', 'main.js'),
  output: {
    path: path.resolve(__dirname, 'assets', 'dist'),
    filename: 'main.js',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.[sc][c]ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { plugins: [AutoPrefixer] },
          },
          'sass-loader',
        ],
      },
      {
        test: /.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}
