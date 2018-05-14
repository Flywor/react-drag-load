const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.dev');
const appConfig = require('../app.config');
const chalk = require('chalk');
const path = require('path');

let { port, host } = appConfig.server;

try {
  const compiler = webpack(config);

  const server = new WebpackDevServer(compiler, {
    contentBase: path.resolve(__dirname, '../'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true,
      assets: false,
      source: false,
      timings: true,
      hash: false,
      version: false,
      chunkModules: false,
      chunkOrigins: false,
    },
  });

  server.listen(port, host, () => {
    const url = `http://${host}:${port}`;
    console.log(chalk.green(`Dev server listening on ${url} ...`));
  });
} catch (e) {
  console.log(chalk.red(`The following error has ocurred: ${e}`));
}
