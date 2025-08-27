import type { ChalkInstance } from 'chalk';
import type { StyleFn } from './log.js';
import { log, logInfo, logWarn } from './log.js';

let enabled = false;

export function setVerbose(v: boolean) {
  enabled = v;
}

export function vInfo(message?: string) {
  if (enabled) logInfo(message);
}

export function vWarn(message?: string) {
  if (enabled) logWarn(message);
}

export function vLog(
  message: string | StyleFn,
  logTag?: string,
  tagColor?: ChalkInstance,
  style?: StyleFn
) {
  if (!enabled) return;
  log(message, logTag, tagColor, style);
}
