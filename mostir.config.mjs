import fg from 'fast-glob';

const ignore = ['**/*.test.ts', '**/__tests__/**', '**/*.d.ts'];

const entryPoints = await fg('src/**/*.ts', {
  cwd: process.cwd(),
  absolute: true,
  onlyFiles: true,
  ignore
});

//esbuild settings
export default {
  build: {
    entryPoints,
    outdir: 'dist',
    bundle: false,
    platform: 'node',
    target: 'esnext',
    format: 'esm',
    logLevel: 'info',
    outbase: 'src',
    metafile: true,
    sourcemap: false,
  },
  ignore
};
