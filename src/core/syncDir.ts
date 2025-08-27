import fs from 'fs-extra';
import path from 'path';
import fg from 'fast-glob';
import pLimit from 'p-limit';
import { vLog } from '../utils/verbose.js';
import { info, error, success } from '../utils/colors.js';
import applyIgnore from './applyIgnore.js';

/**
 * Built-in ignore patterns
 */
const IGNORE_TS = ['**/*.ts', '**/*.d.ts'];
const IGNORE_DIST = ['**/*.js', '**/*.js.map', '**/*.d.ts', '**/*.d.ts.map'];
const IGNORE_DECL = ['**/*.d.ts'];

/**
 * Synchronize src and dist directories:
 * 1. Non-TS files: fully mirrored (add / remove / update)
 * 2. TS files: only handle deletions (remove .js/.js.map/d.ts/d.ts.map if TS is removed);
 *    new and updated .ts files are handled by esbuild
 */
export async function syncDir(src: string, dist: string, userIgnore: string[]) {
  await mirrorNonTsFiles(src, dist, userIgnore);
  await syncFolders(src, dist, userIgnore);
  await removeOrphan(src, dist, userIgnore, {
    srcExt: '.ts',
    outExt: ['.js', '.d.ts', '.mjs']
  });
}

/**
 * Mirror non-TS files between src and dist
 */
async function mirrorNonTsFiles(
  src: string,
  dist: string,
  userIgnore: string[]
) {
  const srcFiles = await fg(['**/*'], {
    cwd: src,
    dot: true,
    ignore: applyIgnore(IGNORE_TS, userIgnore)
  });
  const distFiles = await fg(['**/*'], {
    cwd: dist,
    dot: true,
    ignore: applyIgnore(IGNORE_DIST, userIgnore)
  });

  const srcSet = new Set(srcFiles);
  const limit = pLimit(10);

  // Remove extra non-TS files in dist
  await Promise.all(
    distFiles
      .filter((file) => !srcSet.has(file))
      .map((file) =>
        limit(async () => {
          const distPath = path.join(dist, file);
          vLog(`File, path: ${distPath}`, 'Remove', error);
          await fs.remove(distPath);
        })
      )
  );

  // Copy or update non-TS files from src to dist
  await Promise.all(
    srcFiles.map((file) =>
      limit(async () => {
        const srcPath = path.join(src, file);
        const distPath = path.join(dist, file);

        await fs.ensureDir(path.dirname(distPath));
        vLog(`File, path: ${file}`, 'Copy', info);
        await fs.copyFile(srcPath, distPath);
      })
    )
  );
}

/**
 * Synchronize folder structure between src and dest (including empty folders).
 * - Ensures missing folders in dest are created.
 * - Removes extra folders in dest that do not exist in src.
 */
export async function syncFolders(
  src: string,
  dist: string,
  userIgnore: string[]
) {
  const srcDirs = await fg(['**/'], {
    cwd: src,
    dot: true,
    onlyDirectories: true,
    ignore: userIgnore
  });
  const distDirs = await fg(['**/'], {
    cwd: dist,
    dot: true,
    onlyDirectories: true,
    ignore: userIgnore
  });

  const limit = pLimit(10);

  // 1. Ensure all folders from src exist in dist
  await Promise.all(
    srcDirs.map((dir) =>
      limit(async () => {
        const target = path.join(dist, dir);
        if (!(await fs.pathExists(target))) {
          vLog(`Dir, path: '${target}'`, 'Add', success);
        }
        await fs.ensureDir(target);
      })
    )
  );

  // 2. Remove extra folders in dist that are not present in src
  await Promise.all(
    distDirs.map((dir) =>
      limit(async () => {
        if (!srcDirs.includes(dir)) {
          const distPath = path.join(dist, dir);
          vLog(`Dir, path: '${distPath}'`, 'Remove', error);
          await fs.remove(distPath);
        }
      })
    )
  );
}

/**
 * Remove orphan files in dist if their corresponding TS files no longer exist in src
 */
async function removeOrphan(
  src: string,
  dist: string,
  userIgnore: string[],
  opts: { srcExt: string; outExt: string | string[] }
) {
  const outExts = Array.isArray(opts.outExt) ? opts.outExt : [opts.outExt];

  const tsFiles = await fg([`**/*${opts.srcExt}`], {
    cwd: src,
    dot: true,
    ignore: applyIgnore(IGNORE_DECL, userIgnore)
  });

  const expected = new Map<string, Set<string>>();
  const distPatterns: string[] = [];

  for (const ext of outExts) {
    expected.set(
      ext,
      new Set(tsFiles.map((f) => f.replace(new RegExp(`${opts.srcExt}$`), ext)))
    );
    expected.set(
      `${ext}.map`,
      new Set(
        tsFiles.map((f) =>
          f.replace(new RegExp(`${opts.srcExt}$`), `${ext}.map`)
        )
      )
    );

    distPatterns.push(`**/*${ext}`, `**/*${ext}.map`);
  }

  const distFiles = await fg(distPatterns, { cwd: dist, dot: true });
  const limit = pLimit(10);

  await Promise.all(
    distFiles.map((file) =>
      limit(async () => {
        const distPath = path.join(dist, file);

        for (const [ext, set] of expected) {
          if (file.endsWith(ext) && !set.has(file)) {
            vLog(`Orphan ${ext}, path: '${distPath}'`, 'Remove', error);
            await fs.remove(distPath);
            break;
          }
        }
      })
    )
  );
}
