# ⚙️ Config

Mostir uses a `mostir.config.mjs` file at the project root.

## Options

- **build** (required)  
  Any [esbuild options](https://esbuild.github.io/api/).  
  - Common keys: `entryPoints`, `outdir`, `platform`, `format`, `target`, etc.

- **ignore** (optional)  
  Glob patterns to exclude.  
  Applies to:
  - **build** (when `entryPoints` is a glob string)  
  - **sync** (non-TS file mirroring & folder sync)  
  - **diff / hash** (future roadmap)  

---

## Example Config

```js
// mostir.config.mjs
const ignore = [
  "**/*.test.ts",
  "**/__tests__/**",
  "**/*.d.ts",
];

export default {
  build: {
    entryPoints: "src/**/*.ts",
    outdir: "dist",
    platform: "node",
    format: "esm",
    target: "es2022",
    bundle: false,
    external: ["fs", "path"],
    sourcemap: true,
    minify: false,
    logLevel: "info",
    outbase: "src",
    metafile: true,
  },
  ignore,
};
```

---

## Example Type

```ts
import type { BuildOptions } from "esbuild";

export interface MostirConfig {
  build: BuildOptions;
  ignore?: string[];
}
```

---

## Notes / Common pitfalls

- `export default` is required in `mostir.config.mjs`.  
- `outfile` and `entryPoints` (glob) cannot be used together.  
- `--sync` / `--clean` are not supported when using `outfile`.  
