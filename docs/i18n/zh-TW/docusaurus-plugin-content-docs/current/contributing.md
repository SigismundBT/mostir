# 🤝 貢獻指南

感謝你對 **mostir** 專案的喜愛！  
我們歡迎錯誤回報 (bug report)、功能請求 (feature request)、以及 Pull Request。

---

## 開始貢獻

1. Fork 專案並 clone 到本地。
2. 安裝相依套件：
   ```bash
   pnpm install
   ```
3. 建置專案：
   ```bash
   pnpm build
   ```
4. 在本地執行 CLI：
   ```bash
   pnpm dev
   ```

---

## 開發規範

- **程式風格**：使用 TypeScript（嚴格模式）、非同步程式請用 async/await，並保持函式簡潔且專注。  
- **Commit 訊息**：遵循 [Conventional Commits](https://www.conventionalcommits.org/)：
  - `feat:` 新功能
  - `fix:` 錯誤修正
  - `docs:` 文件變更
  - `refactor:` 重構程式碼
  - `chore:` 建置 / 測試 / 工具相關變更

---

## Pull Request 流程

1. 從 `main` 建立 feature 分支。
2. 確保程式能正確建置：
   ```bash
   pnpm build
   ```
3. 如果變更影響到 CLI 或 config，請更新相關文件。
4. 開 PR 並清楚描述你的修改內容。

---

## 問題回報 (Issues)

- 遇到問題時，請使用 **Bug report** 模板。  
- 想新增功能，請使用 **Feature request** 模板。  
- 開新 issue 前，請先確認是否已有相同的 issue。

---

## 授權條款

提交貢獻代表你同意貢獻內容將依 [MIT License](https://github.com/SigismundBT/mostir/blob/main/LICENSE.txt) 授權。
