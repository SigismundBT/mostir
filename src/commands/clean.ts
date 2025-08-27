// src/commands/clean.ts
import fs from 'fs-extra';
import path from 'path';
import loadConfig from '../core/loadConfig.js';
import { log, logSuccess, UserError } from '../utils/log.js';
import { info } from '../utils/colors.js';

export default async function clean() {
  const { config } = await loadConfig();
  const outdir = config.build.outdir;
  if (!outdir) {
    throw new UserError(
      `Clean is only supported when using 'outdir'. 'outfile' is not supported.`
    );
  }
  const target = path.resolve(process.cwd(), outdir);
  await fs.emptyDir(target);
  log(`Clean OutDir: ${target}`, 'Start', info);
  logSuccess('Clean finished.');
}
