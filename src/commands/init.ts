import path from 'path';
import fs from 'fs-extra';
import dedent from 'dedent';
import {
  logStart,
  exitWithError,
  logFinished,
  UserError
} from '../utils/log.js';

export default async function init(force = false) {
  const mostirconfig = dedent`
    /**
     * Esbuild build options
     * For full list of options, see: https://esbuild.github.io/api/#build
     *
     * Common required options:
     *   - entryPoints: REQUIRED, single file or glob pattern
     *   - outdir:      REQUIRED, output directory
     *
     * Other commonly used options:
     *   - platform:    "node" | "browser"
     *   - format:      "esm" | "cjs" | "iife"
     *   - target:      e.g. "es2022"
     *   - bundle:      boolean, whether to bundle
     *   - external:    list of packages to exclude from bundle
     *                  If you are not using bundle, please delete this option.
     *   - sourcemap:   boolean, generate source map
     *   - minify:      boolean, minify output
     *   - logLevel:    "info" | "warning" | "error" | "silent"
     *   - outbase:     input root directory for preserving folder structure
     *   - metafile:    boolean, generate build metafile
     */

    // ignore patterns (optional)
    const ignore = [
      "**/*.test.ts",
      "**/__tests__/**",
      "**/*.d.ts"
    ];

    // you can use packages (e.g. fast-glob) together with 'ignore' to filter entry files

    export default {
      // esbuild settings
      build: {
        entryPoints: "src/**/*.ts",   // *REQUIRED
        outdir: "dist",               // *REQUIRED
        platform: "node",
        format: "esm",
        target: "es2022",
        bundle: false,
        external: ["fs", "path"],     // *DELETE if bundle: false. If you want to build directly, you should delete this, or this pre-set config will fail
        sourcemap: true,
        minify: false,
        logLevel: "info",
        outbase: "src",
        metafile: true
      },
      ignore
    };
`;

  const cwd = process.cwd();
  const filePath = path.join(cwd, 'mostir.config.mjs');

  try {
    logStart('Initializing...');

    if (!force && (await fs.pathExists(filePath))) {
      throw new UserError(
        `Config file already exists at ${filePath}. Use --force to overwrite.`
      );
    }

    await fs.writeFile(filePath, mostirconfig, {
      flag: force ? 'w' : 'wx'
    });

    logFinished(`Initialization completed. File created at: ${filePath}`);
  } catch (err) {
    exitWithError(err);
  }
}
