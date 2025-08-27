import path from 'path';
import fg from 'fast-glob';
import pLimit from 'p-limit';
import type { BuildOptions } from 'esbuild';

/**
 * Normalize build.entryPoints into a list of source directories.
 *
 * Examples:
 *   "src/index.ts"              → ["src"]
 *   ["src/index.ts", "cli.ts"]  → ["src", "."]
 *   "src/**\/*.ts"              → all matched dirs under "src/".
 *   { foo: "src/foo.ts" }       → ["src"]
 *
 * Used by sync.ts to mirror source structure into outdir.
 */

export default async function extractEntryDirs(
  build: BuildOptions
): Promise<string[]> {
  const entries = build.entryPoints;
  if (!entries) return [];

  const normalize = (p: string) => path.dirname(p);
  const dirs: string[] = [];
  const limit = pLimit(10);

  const tasks: Promise<string[]>[] = [];

  if (typeof entries === 'string') {
    const e = entries as string;
    if (e.includes('*')) {
      tasks.push(limit(() => fg(e).then((res) => res.map(normalize))));
    } else {
      dirs.push(normalize(e));
    }
  } else if (Array.isArray(entries)) {
    for (const e of entries) {
      if (typeof e === 'string') {
        if (e.includes('*')) {
          tasks.push(limit(() => fg(e).then((res) => res.map(normalize))));
        } else {
          dirs.push(normalize(e));
        }
      } else if (typeof e === 'object' && 'in' in e) {
        dirs.push(normalize(e.in));
      }
    }
  } else if (typeof entries === 'object') {
    for (const e of Object.values(entries)) {
      if (e.includes('*')) {
        tasks.push(limit(() => fg(e).then((res) => res.map(normalize))));
      } else {
        dirs.push(normalize(e));
      }
    }
  }

  const asyncResults = await Promise.all(tasks);
  return [...new Set([...dirs, ...asyncResults.flat()])];
}
