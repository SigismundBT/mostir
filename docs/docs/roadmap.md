# 🗺 Roadmap

| Phase | Features | Status | Version |
|-------|-----------|--------|---------|
| Phase 1 – MVP | - `build` → basic esbuild wrapper <br /> - `clean` → clear outdir <br /> - `sync` → sync outdir / remove orphan files <br /> - support glob-based entries (`src/**/*.ts`) | ✅ Current | v1.0.0 |
| Phase 2 – Enhancements | - `build --watch` → watch files and rebuild automatically <br /> - `build --diff` → rebuild only changed files (based on mtime) | 🔄 Planned | – |
| Phase 3 – Advanced Features | - Hash system → precise diff / cache mechanism <br /> - `.mostir.lock.json` → track hash states to avoid redundant builds <br /> - Isolate → manage multiple entries/projects separately | 🔑 Future | – |

