import webpack from 'webpack';
import path from 'path';
import { buildLoaders } from './configs/webpack/buildLoaders';
import { buildPlugins } from './configs/webpack/buildPlugins';
import { buildDevServer } from './configs/webpack/buildDevServer';
import { BuildMode, BuildOptions, EnvList } from './configs/webpack/types';

export default (env: EnvList) => {
  const mode: BuildMode = 'development';
  const isDev = mode === 'development';
  const port = env.port || 3000;

  const options: BuildOptions = {
    isDev,
    mode,
    port
  }

  const config: webpack.Configuration = {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    plugins: buildPlugins(),
    module: {
      rules: buildLoaders(options),
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };

  return config;
};