---
slug: project-started  
title: Project Started    
authors: [SigismundBT]  
tags: [mostir, release] 
date: 2025-08-27        
---

It's my pleasure to announce the release of **mostir v1.0.0** 🎉

What started as a small helper around esbuild to streamline my own workflow has now grown into a standalone developer tool. With mostir, you can:

- 📦 **Keep modules clean** – zero-bundle builds with native esbuild
- ⚡ **Use glob patterns** – `src/**/*.ts` works out of the box
- 🔄 **Sync instantly** – mirror `src` to `outdir` and remove orphan files
- 🧹 **Clean fast** – wipe your dist directory in one command
- 🔧 **Configure easily** – manage builds with `mostir.config.mjs`
- 🛠 **Stay flexible** – forward any esbuild option, no lock-in

This tool has already helped me in my daily work, and I hope it can help you too.  

👉 Check out the [docs](/docs/getting-started) to get started, or install directly with:

```bash
pnpm add mostir -D
```

Thanks for trying it out — feedback and contributions are always welcome!