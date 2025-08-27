import path from 'path';
import { pathToFileURL } from 'url';
import fs from 'fs-extra';
import { log, UserError } from '../utils/log.js';
import { info } from '../utils/colors.js';
import type { MostirConfig } from '../types';

/**
 * USAGE: const { config, filepath } = await loadMostirConfig();
 * - config = config script
 * - filepath = path
 */

export default async function loadConfig(): Promise<{
  config: MostirConfig;
  filepath: string;
}> {
  let dir = process.cwd();

  while (true) {
    const filepath = path.join(dir, 'mostir.config.mjs');

    if (await fs.pathExists(filepath)) {
      const mod = await import(pathToFileURL(filepath).href);

      if (!mod?.default) {
        throw new UserError(`Config file is empty: ${filepath}`);
      }

      log(`Found Config file: ${filepath}`, 'Config', info);

      return {
        config: mod.default as MostirConfig,
        filepath
      };
    }

    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  throw new UserError(`Unable to find 'mostir.config.mjs'`);
}
