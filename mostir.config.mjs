import fg from 'fast-glob';

// ignore patterns (optional)
const ignore = ['**/*.test.ts', '**/__tests__/**', '**/*.d.ts'];

// you can use packages (e.g. fast-glob) together with 'ignore' to filter entry files
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
