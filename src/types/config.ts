import type { BuildOptions } from 'esbuild';

export interface MostirConfig {
  build: BuildOptions;
  ignore?: string[];
}
