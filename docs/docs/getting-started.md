# 🚀 Getting Started

Welcome to **mostir** — a lightweight CLI to streamline esbuild workflows.

---

## 📦 Installation

Install with your preferred package manager:

```bash
npm install -D mostir
# or
yarn add -D mostir
# or
pnpm add -D mostir
```

---

## 🚀 Quick Start

Initialize a config file:

```bash
mostir init
```

- This will generate a `mostir.config.mjs` in your project root.  
- The `build` section in `mostir.config.mjs` follows [esbuild options](https://esbuild.github.io/api/).
- ⚠️ In the `init`-generated `mostir.config.mjs`, if you want to build with `bundle: false`, you should remove the `external` option.

👉 **Review and adjust the settings before running `build`, or it may fail.**

Run your first build:

```bash
mostir build
```


---

## 🧹 Useful Commands

- `mostir build --sync` → Sync `dist dir` with `source dir` first ,then run esbuild with your config  
- `mostir sync` → Sync outdir with src (remove orphan files)  
- `mostir clean` → Clear all files inside outdir  

For more details and available options, see the [Commands](./commands.md) section.
