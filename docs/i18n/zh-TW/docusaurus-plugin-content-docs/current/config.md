# ⚙️ 設定

mostir 使用放在專案根目錄的 `mostir.config.mjs` 做為設定檔。

## 選項

- **build** (必填)  
  任意 [esbuild 設定](https://esbuild.github.io/api/)。  
  - 常見鍵值：`entryPoints`、`outdir`、`platform`、`format`、`target` 等。

- **ignore** (選填)  
  要排除的 glob 樣式。  
  適用於：
  - **build**（當 `entryPoints` 是 glob 字串時）  
  - **sync**（非 TS 檔案同步與資料夾同步）  
  - **diff / hash**（未來規劃）  

---

## 設定範例

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

## 型別範例

```ts
import type { BuildOptions } from "esbuild";

export interface MostirConfig {
  build: BuildOptions;
  ignore?: string[];
}
```

---

## 注意事項 / 常見陷阱

- `mostir.config.mjs` 中必須使用 `export default`。  
- `outfile` 與 `entryPoints` (glob) 不能同時使用。  
- 使用 `outfile` 時不支援 `--sync` / `--clean`。
