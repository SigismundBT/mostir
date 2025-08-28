# 📖 使用範例

此頁展示 `mostir.config.mjs` 的進階用法。

---

## 設定檔建立
不需要每次都透過 `mostir init` 來產生新的 `mostir.config.mjs`，
可以直接從其他專案（或範本）複製一份，再依照需求調整設定。

**範例**
- [mostir Github Repository](https://github.com/SigismundBT/mostir/)，mostir 本身就是用 mostir build 搭配自己的設定檔建置的。

---

## 搭配 `fast-glob` 使用 glob 樣式

預設情況下，你可以直接將 glob 字串傳給 `entryPoints`。  
若需要更進階的篩選，可以使用 [fast-glob](https://github.com/mrmlnc/fast-glob) 手動解析 entry points。

```js
// mostir.config.mjs
import fg from "fast-glob";

const ignore = ["**/*.test.ts", "**/__tests__/**", "**/*.d.ts"];

// 或者，使用 fast-glob 解析 entry points 以進行進階篩選
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

## 注意事項
- 使用 fast-glob 時建議搭配 `absolute: true`，以確保 esbuild 接收到完整解析路徑。  
- `ignore` 陣列可同時用於 `fast-glob` 與 mostir 的 `ignore` 選項。  
- `ignore` 模式特別適合在需要更精細控制包含/排除檔案的情境使用（例如 monorepo 專案）。
