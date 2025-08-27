import { tag, warn, error, success, info } from './colors.js';
import { ChalkInstance } from 'chalk';

const logLabel = 'mostir';

export type StyleFn = (text: string) => string;

/**
 * Format a log tag with fixed width and optional color
 */
function formatTag(tag?: string, color?: ChalkInstance, width = 10) {
  if (!tag) return '';
  const raw = (tag + ':').padEnd(width, ' ');
  return color ? color(raw) : raw;
}

/**
 * Generic logger
 */
export function log(
  message: string | StyleFn,
  logTag?: string,
  tagColor?: ChalkInstance,
  style?: StyleFn
) {
  const raw = typeof message === 'function' ? message('') : message;
  const finalMessage = style ? style(raw) : raw;

  console.log(
    `${tag(logLabel)} ${formatTag(logTag, tagColor)} ${finalMessage}`
  );
}

/**
 * Common log helpers
 */
export function logStart(message?: string) {
  console.log(`${tag(logLabel)} ${formatTag('Start', info)} ${message ?? ''}`);
}

export function logInfo(message?: string) {
  console.log(`${tag(logLabel)} ${formatTag('Info', info)} ${message ?? ''}`);
}

export function logSuccess(message?: string) {
  console.log(
    `${tag(logLabel)} ${formatTag('Success', success)} ${message ?? ''}`
  );
}

export function logFinished(message?: string) {
  console.log(
    `${tag(logLabel)} ${formatTag('Finished', success)} ${message ?? ''}`
  );
}

export function logWarn(message?: string) {
  console.warn(`${tag(logLabel)} ${formatTag('Warn', warn)} ${message ?? ''}`);
}

/**
 * Log an error without exiting the process
 */
export function logError(err?: unknown) {
  if (err instanceof Error) {
    // first line → clean error label + message
    console.error(`${tag(logLabel)} ${error(err.name + ':')} ${err.message}`);

    // stack trace → indented, no prefix, skip duplicate message
    if (err.stack) {
      const stack = formatStack(err.stack);
      if (stack) console.error(stack);
    }
  } else if (err) {
    console.error(`${tag(logLabel)} ${error(String(err))}`);
  }
}

/**
 * User-level error (for invalid CLI usage)
 */
export class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = `${error('UserError')}`;
  }
}

/**
 * Format stack trace with prefixed labels
 */
function formatStack(stack: string) {
  return stack
    .split('\n')
    .slice(1) // skip first line (already printed as message)
    .map((line) => '    ' + line) // indent for clarity
    .join('\n');
}

/**
 * Fatal error handler → logs and terminates the process
 */
export function exitWithError(err: unknown): never {
  if (err instanceof UserError) {
    console.error(`${tag(logLabel)} ${error(err.message)}`);
  } else if (err instanceof Error) {
    console.error(`${tag(logLabel)} ${error(err.name + ':')} ${err.message}`);
    if (err.stack) {
      const stack = formatStack(err.stack);
      if (stack) console.error(stack);
    }
  } else {
    console.error(`${tag(logLabel)} ${error(String(err))}`);
  }

  process.exit(1);
}
