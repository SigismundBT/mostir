# 🛠 Commands

## General Commands
### `mostir init`
Initialize a `mostir.config.mjs` in the project root.

**Options**
- `--force, -f`  
  Overwrite existing config file.

**Note**
- The `build` section in `mostir.config.mjs` follows [esbuild options](https://esbuild.github.io/api/).

---

### `mostir build`
Run esbuild with the given config.

**Options**
- `--sync, -s`  
  Run sync before build (**cannot be used with `--clean`**).
- `--clean, -c`  
  Run clean before build (**cannot be used with `--sync`**).
- `--verbose, -v`  
  Show detailed logs (only works with `--sync`).

**Note**
- ⚠️ `--sync` and `--clean` cannot be used together.  
- The behavior of `--sync` and `--clean` is the same as running `mostir sync` and `mostir clean`.  
  → See [Outdir-only Commands](#outdir-only-commands) for limitations and details of `sync` and `clean`.

---

## Outdir-only Commands
The following limitations apply to both `sync` and `clean`:
- `outfile` (single file output) is **not supported**.
- Only `outdir` builds are compatible.
- When used with `mostir build`:

```bash  
    mostir build --sync   # runs sync, then build
    mostir build --clean  # runs clean, then build
```

  - `--sync` and `--clean` cannot be used together.

#### Comparison: `sync` vs `clean`

| Command | Behavior | Use case | Safety |
|---------|----------|----------|--------|
| **sync**  | Incrementally updates `dist dir` to match `source dir` (`outbase` or `/src`). Syncs non-TS files and removes orphan outputs (e.g. `.js`, `.d.ts`, maps) when their `.ts` sources are deleted. | Keep build output consistent without wiping everything. | ✅ Safer (incremental cleanup) |
| **clean** | Empties the entire `dist dir` at once (ignores `outbase`). | Reset `dist dir` completely before a fresh build. | ⚠️ Destructive (full wipe, cannot be undone) |

---

### `mostir sync`
Synchronize `dist dir` with `source dir` (removes orphan files).

**Requirements**
- In `mostir.config.mjs`, the `build` section **must specify `outdir`**.
- If `outbase` is not set, it defaults to `/src`.
- If neither `outbase` nor `/src` exists, `sync` cannot run.

**Mechanism**
- Compares files in `dist dir` with `source dir` (`outbase` or `/src`).
- Syncs non-TS files into `dist dir`.
- Removes *orphan files* in `dist dir`, including:
  - Non-TS files deleted from `source dir`.
  - TS outputs left behind after deletion of `.ts` in `source dir`:
    - `.js`
    - `.js.map`
    - `.d.ts`
    - `.d.ts.map`

**Example**
- If `/src/foo.ts` is deleted, then `outdir/foo.js`, `foo.d.ts`, and `foo.js.map` will be removed.

**Options**
- `--verbose, -v`
  Show detailed sync log.


---

### `mostir clean`
Clear all files inside `dist dir`.

**Requirements**
- In `mostir.config.mjs`, the `build` section **must specify `outdir`**.

**Mechanism**
- Empties the entire `dist dir` at once (ignores `outbase`).
- ⚠️ This operation cannot be undone.

**Options**
*(none)*

