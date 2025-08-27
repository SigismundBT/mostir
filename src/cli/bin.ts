#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { logInfo, logError, UserError } from '../utils/log.js';
import { setVerbose } from '../utils/verbose.js';
import init from '../commands/init.js';
import build from '../commands/build.js';
import sync from '../commands/sync.js';
import clean from '../commands/clean.js';

yargs(hideBin(process.argv))
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    describe: 'Show detailed logs',
    default: false,
    global: true
  })

  .option('clean', {
    alias: 'c',
    type: 'boolean',
    describe: 'clean the outdir (default: dist)',
    default: false,
    global: true
  })

  .command(
    'init',
    "create 'mostir.config.mjs' as default script",
    (y) =>
      y.option('force', {
        alias: 'f',
        type: 'boolean',
        default: false,
        describe: 'Overwrite existing mostir.config.mjs if it exists'
      }),
    async (argv) => {
      if (argv.force) {
        logInfo(`Force overwrite mostir.config.mjs`);
      }
      await init(argv.force);
    }
  )
  .command(
    'sync',
    'synchronize dist with src structure (no build)',
    (y) => {},
    async (argv) => {
      setVerbose(argv.verbose ?? false);
      try {
        await sync();
      } catch (err) {
        logError(err);
        process.exit(1);
      }
    }
  )

  .command(
    'build',
    'run esbuild with preset scripts',
    (y) =>
      y.option('sync', {
        alias: 's',
        type: 'boolean',
        default: false,
        describe: 'sync outDir from inDir.'
      }),
    async (argv) => {
      setVerbose(argv.verbose ?? false);
      if (argv.sync && argv.clean) {
        throw new UserError(
          'You can only run build --sync and build --clean seperately.'
        );
      }
      if (argv.sync) {
        try {
          await sync();
        } catch (err) {
          logError(err);
          process.exit(1);
        }
      }
      if (argv.clean) {
        try {
          await clean();
        } catch (err) {
          logError(err);
          process.exit(1);
        }
      }
      await build();
    }
  )
  .command(
    'clean',
    'clean the outdir (default: dist)',
    (y) => {},
    async (argv) => {
      try {
        await clean();
      } catch (err) {
        logError(err);
        process.exit(1);
      }
    }
  )

  .demandCommand(1, 'You need at least one command before moving on')
  .strictCommands()
  .help()
  .alias('h', 'help')
  .parse();
