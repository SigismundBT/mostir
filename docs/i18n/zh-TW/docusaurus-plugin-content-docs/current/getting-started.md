# 🚀 快速開始

歡迎使用 **mostir** —— 一個輕量級的 CLI 工具，協助你簡化 esbuild 的工作流程。

---

## 📦 安裝

使用你喜歡的套件管理工具安裝：

```bash
npm install -D mostir
# 或
yarn add -D mostir
# 或
pnpm add -D mostir
```

---

## 🚀 快速入門

初始化設定檔：

```bash
mostir init
```

- 這會在專案根目錄產生一個 `mostir.config.mjs`。  
- `mostir.config.mjs` 中的 `build` 區段遵循 [esbuild](https://esbuild.github.io/api/) 設定。
- ⚠️ 在 `init` 產生的 `mostir.config.mjs` 裡，如果你想使用 `bundle: false`，必須移除 `external` 設定。

👉 **請在執行 `build` 前檢查並調整設定，否則可能會跳出錯誤。**

執行第一次建置：

```bash
mostir build
```

---

## 🧹 常用指令

- `mostir build --sync` → 先同步 `輸出資料夾 (dist dir)` 與 `來源資料夾 (source dir)`，再依設定執行 esbuild  
- `mostir sync` → 將 `輸出資料夾 (dist dir)` 與 來源資料夾 (source dir) 同步（移除孤立檔案 orphan files）  
- `mostir clean` → 清空 `輸出資料夾 (dist dir)` 內的所有檔案  

更多細節與可用選項，請參考 [指令](./commands.md) 章節。
