# 🛠 Commands

## `mostir init`
Initialize a `mostir.config.mjs` in the project root.

**Options**
- `--force, -f`  
  Overwrite existing config file.

---

## `mostir build`
Run esbuild with the given config.

**Options**
- `--sync, -s`  
  Run sync before build (**cannot be used with `--clean`**).  
- `--clean, -c`  
  Run clean before build (**cannot be used with `--sync`**).  
- `--verbose, -v`  
  Show detailed logs (only works with `--sync`).  

---

## `mostir sync`
Synchronize `outdir` with `src` (removes orphan files).

**Options**
- `--verbose, -v`  
  Show detailed sync log.

---

## `mostir clean`
Clear all files inside `outdir`.

**Options**
*(none)*
