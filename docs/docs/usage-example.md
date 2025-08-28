# 📖 Usage Example

This page shows advanced usage for `mostir.config.mjs`.

---

## Setting up Config
You don’t need to run `mostir init` to create a fresh `mostir.config.mjs` every time.
Instead, just copy one from another project (or a template) and tweak the settings for your case.

**Example**
- [mostir Github Repository](https://github.com/SigismundBT/mostir/), mostir itself is built with mostir build, using its own config.

---

## Using glob patterns with `fast-glob`

By default, you can pass a glob string directly to `entryPoints`.  
For more advanced filtering, you can use [fast-glob](https://github.com/mrmlnc/fast-glob) to resolve entry points manually.

```js
// mostir.config.mjs
import fg from "fast-glob";

const ignore = ["**/*.test.ts", "**/__tests__/**", "**/*.d.ts"];

// alternatively, resolve entry points with fast-glob for advanced filtering
const entryPoints = await fg("src/**/*.ts", {
  cwd: process.cwd(),
  absolute: true,
  onlyFiles: true,
  ignore,
});

export default {
  build: {
    entryPoints,
    outdir: "dist",
    bundle: false,
    platform: "node",
    target: "esnext",
    format: "esm",
    logLevel: "info",
    outbase: "src",
    metafile: true,
  },
  ignore,
};
```

---

## Notes
- Use `absolute: true` with fast-glob to ensure esbuild receives fully resolved paths.  
- The `ignore` array can be reused for both `fast-glob` and the `ignore` option in `mostir`.  
- `ignore` pattern is useful if you want fine-grained control over which files to include/exclude (especially in monorepo setups).