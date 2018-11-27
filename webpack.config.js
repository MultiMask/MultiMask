var webpack = require('webpack'),
  path = require('path'),
  fileSystem = require('fs'),
  env = require('./utils/env'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WriteFilePlugin = require('write-file-webpack-plugin');

var config = require('./config.json');
var apiKeys = require('./api-keys.json');

function getConfigParams(params) {
  return Object.keys(params).reduce((res, key) => {
    res[key] = JSON.stringify(params[key]);
    return res;
  }, {});
}

var alias = {
  bcnetwork: path.resolve(__dirname, 'src/js/blockchain/index.ts'),
  constants: path.resolve(__dirname, 'src/js/constants'),
  config: path.resolve(__dirname, 'src/js/config'),
  helpers: path.resolve(__dirname, 'src/js/helpers'),
  libs: path.resolve(__dirname, 'src/js/libs'),
  models: path.resolve(__dirname, 'src/js/models'),
  services: path.resolve(__dirname, 'src/js/services'),
  ui: path.resolve(__dirname, 'src/js/ui/index.ts'),
  app: path.resolve(__dirname, 'src/js/app'),
  popup: path.resolve(__dirname, 'src/js/popup'),
  prompt: path.resolve(__dirname, 'src/js/prompt'),
  types: path.resolve(__dirname, 'src/js/types'),
  mock: path.resolve(__dirname, 'utils/mock'),
  img: path.resolve(__dirname, 'src/img')
};

var secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js');
var fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

var options = {
  mode: 'development',
  // context: path.join(__dirname, 'src', 'js'),
  entry: {
    popup: path.join(__dirname, 'src', 'js', 'popup.tsx'),
    prompt: path.join(__dirname, 'src', 'js', 'prompt.tsx'),
    inpage: path.join(__dirname, 'src', 'js', 'inpage.ts'),
    options: path.join(__dirname, 'src', 'js', 'options.tsx'),
    content: path.join(__dirname, 'src', 'js', 'content.ts'),
    background: path.join(__dirname, 'src', 'js', 'background.ts')
  },
  devtool: 'eval',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
        exclude: /node_modules/
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        loader: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              babelCore: '@babel/core',
              babelOptions: {
                babelrc: true
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions.map(extension => '.' + extension).concat(['.tsx', '.ts', '.jsx', '.js', '.css'])
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(['build']),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
      ...getConfigParams(config),
      ...getConfigParams(apiKeys)
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
        transform: function(content, path) {
          // generates the manifest file using the package.json informations
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString())
            })
          );
        }
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'prompt.html'),
      filename: 'prompt.html',
      chunks: ['prompt']
    }),
    new WriteFilePlugin()
  ]
};

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-eval-source-map';
}

module.exports = options;
