export type BuildMode = 'production' | 'development';

export interface BuildOptions {
  mode: BuildMode;
  isDev: boolean;
  port: number;
}

export interface EnvList {
  mode: BuildMode,
  port: number;
}