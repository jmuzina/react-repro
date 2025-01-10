import path from "node:path";

export default {
  entry: "./src/ssr/client/entry-client.js",
  devtool: 'source-map',
  output: {
    clean: true,
    path: path.resolve('./dist/client'),
    publicPath: '/dist/client/',
    filename: '[name].js',
    chunkFilename: '[name].js',
    assetModuleFilename: '[hash][ext][query]',
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          chunks: 'all',
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            switch (packageName) {
              case 'react':
              case 'react-dom':
              case 'scheduler':
              case 'object-assign':
                return 'react';
              case 'path-to-regexp':
              case 'uuid':
                return 'rarely';
              default:
                return 'vendor';
            }
          },
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  mode: "development",
};
