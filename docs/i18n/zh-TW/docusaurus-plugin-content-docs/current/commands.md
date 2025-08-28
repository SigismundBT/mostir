# 🛠 指令

## 一般指令
### `mostir init`
在專案根目錄新增 `mostir.config.mjs` 設定檔

**選項**
- `--force, -f`  
  覆寫已存在的設定檔。

**注意**
- `mostir.config.mjs` 中的 `build` 區段遵循 [esbuild](https://esbuild.github.io/api/) 設定。 

---

### `mostir build`
依照設定執行 esbuild。

**選項**
- `--sync, -s`  
  在 build 前執行 sync（**不能與 `--clean` 同時使用**）。
- `--clean, -c`  
  在 build 前執行 clean（**不能與 `--sync` 同時使用**）。
- `--verbose, -v`  
  顯示詳細日誌（僅在搭配 `--sync` 時有效）。

**注意**
- ⚠️ `--sync` 與 `--clean` 不能同時使用。  
- `--sync` 與 `--clean` 的行為等同於執行 `mostir sync` 與 `mostir clean`。  
  → 詳見 [僅限 outdir 的指令](#僅限-outdir-的指令) 了解 `sync` 與 `clean` 的限制與細節。

---

## 僅限 outdir 的指令
以下限制同時適用於 `sync` 與 `clean`：
- 不支援 `outfile`（單一檔案輸出）。
- 僅支援 `outdir` 的建置方式。
- 當與 `mostir build` 搭配使用時：

```bash  
    mostir build --sync   # 先執行 sync，再執行 build
    mostir build --clean  # 先執行 clean，再執行 build
```

  - `--sync` 與 `--clean` 不能同時使用。

#### 比較：`sync` vs `clean`

| 指令 | 行為 | 適用情境 | 安全性 |
|------|------|----------|--------|
| **sync**  | 同步更新 `輸出資料夾 (dist dir)` 以符合 `來源資料夾 (source dir)` (`outbase` 或 `/src`) 內的檔案。當來源 `.ts` 被刪除時，會同步非 TS 檔案，並刪除孤立輸出檔（如 `.js`、`.d.ts`、map）。 | 保持輸出與來源一致，但不會整個清空。 | ✅ 較安全（僅同步） |
| **clean** | 一次清空整個 `輸出資料夾 (dist dir)`（不參照 `outbase`）。 | 在重新建置前完全重置輸出目錄。 | ⚠️ 具破壞性（完全清空，無法還原） |

---

### `mostir sync`
將 `輸出資料夾 (dist dir)` 與 `來源資料夾 (source dir)` 同步（移除孤立檔案 orphan files）。

**需求**
- `mostir.config.mjs` 的 `build` 區段必須指定 `outdir`。
- 若未設定 `outbase`，則預設為 `/src`。
- 若 `outbase` 與 `/src` 皆不存在，則 `sync` 無法執行。

**運作方式**
- 比對 `輸出資料夾 (dist dir)` 與 `來源資料夾 (source dir)`（`outbase` 或 `/src`）。
- 將非 TS 檔案同步至 `輸出資料夾 (dist dir)`。
- 移除 `輸出資料夾 (dist dir)` 中的 *孤立檔案 orphan files*，包含：
  - 已從 `來源資料夾 (source dir)` 刪除的非 TS 檔案。
  - `.ts` 被刪除後遺留的 TS 輸出檔案：
    - `.js`
    - `.js.map`
    - `.d.ts`
    - `.d.ts.map`

**範例**
- 當 `/src/foo.ts` 被刪除時，`outdir/foo.js`、`foo.d.ts`、`foo.js.map` 也會被刪除。

**選項**
- `--verbose, -v`  
  顯示詳細同步日誌。

---

### `mostir clean`
清空 `輸出資料夾 (dist dir)` 內的所有檔案。

**需求**
- `mostir.config.mjs` 的 `build` 區段必須指定 `outdir`。

**運作方式**
- 一次性清空整個 `輸出資料夾 (dist dir)`（不參照 `outbase`）。
- ⚠️ 此操作無法復原。

**選項**
*(無)*
