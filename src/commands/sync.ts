import path from 'path';
import fs from 'fs-extra';
import loadConfig from '../core/loadConfig.js';
import extractEntryDirs from '../core/extractEntryDirs.js';
import { syncDir } from '../core/syncDir.js';
import { logFinished, logStart, UserError } from '../utils/log.js';

export default async function sync() {
  logStart(`Sync start`);
  const { config } = await loadConfig();
  const userIgnore: string[] = config.ignore ?? [];

  if (!config.build.entryPoints) {
    throw new UserError("Missing required 'build.entryPoints' in config");
  }

  const entryDirs = await extractEntryDirs(config.build);
  const outdir = config.build.outdir;

  if (!outdir) {
    throw new UserError(
      `You can only use sync when mostir.config,mjs has 'outdir' option.`
    );
  }

  for (const dir of entryDirs) {
    let outbase = config.build.outbase;
    if (!outbase) {
      if (fs.existsSync(path.resolve(process.cwd(), 'src'))) {
        outbase = 'src';
      } else {
        throw new UserError(
          `You must set 'outbase' in mostir.config.mjs, or have a 'src' directory in your project.`
        );
      }
    }
    const relative = path.relative(outbase, dir);
    const target = path.join(outdir, relative);

    await fs.ensureDir(target);
    await syncDir(dir, target, userIgnore);
  }
  logFinished('Sync finished!');
}
