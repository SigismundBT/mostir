import { build as esbuild } from 'esbuild';
import { log, logStart, exitWithError, UserError } from '../utils/log.js';
import { info, success } from '../utils/colors.js';
import loadConfig from '../core/loadConfig.js';

export default async function buildts() {
  logStart('Start Building...');
  try {
    const { config, filepath } = await loadConfig();
    if (!config?.build?.entryPoints) {
      throw new UserError("Missing 'build.entry' in config");
    }

    log(`Using Config: '${filepath}'`, 'Build', info);
    const result = await esbuild(config.build);

    if (result.errors.length > 0) {
      throw new UserError('Build failed with errors.');
    }

    log(`Build success with config: '${filepath}'`, 'Build', success);
  } catch (err) {
    exitWithError(err);
  }
}
