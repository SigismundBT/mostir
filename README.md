[![npm](https://img.shields.io/npm/v/mostir)](https://www.npmjs.com/package/mostir)
![node-current](https://img.shields.io/node/v/mostir)
![License](https://img.shields.io/github/license/SigismundBT/mostir)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)

# mostir
A lightweight CLI to streamline esbuild workflows
Simplify and standardize esbuild builds with a flexible scaffold tool.

---

## ✨ Features

- 📦 Keep modules clean – run zero-bundle builds with native esbuild  
- ⚡ Use glob patterns – `src/**/*.ts` works out of the box  
- 🔄 Sync instantly – mirror `src` to `outdir` and remove orphan files  
- 🧹 Clean fast – wipe your dist directory in one command  
- 🔧 Configure easily – manage builds with `mostir.config.mjs`  
- 🛠 Stay flexible – forward any esbuild option, no lock-in  

---

## 📦 Installation

```bash
npm install -D mostir
# or
yarn add -D mostir
# or
pnpm add -D mostir
```

---

## 🚀 Quick Start

```bash
mostir init
mostir build
```

👉 Please review and adjust the generated `mostir.config.mjs` before running `build`, or it may fail.

---

## 📖 Documentation

📖 Full documentation → [mostir docs](https://sigismundbt.github.io/mostir)  

---

## 📜 License

MIT © SigismundBT
