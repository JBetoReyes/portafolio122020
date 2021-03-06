import chalk from "chalk";
import { response } from "express";
import { resolve } from "path";

export const logMessage = (message: string, level: string = "info") => {
  const color =
    level === "error"
      ? "red"
      : level === "warning"
      ? "yellow"
      : level === "info"
      ? "blue"
      : "white";
  console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

export const compilerPromise = (name: string, compiler: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling`);
    });
    compiler.hooks.done.tap(name, (stats: any) => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return reject(`Failed to compile ${name}`);
    });
  });
};

export const sleep = (ms: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms));
