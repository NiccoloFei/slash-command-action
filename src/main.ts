import {
  getBooleanInput,
  getInput,
  setFailed,
} from "@actions/core";

import { CommandHandler } from "./commandHandler";

import type { PermissionLevel } from "./interfaces";

export async function run(): Promise<void> {
  try {
    await new CommandHandler(
      getInput("repo-token", { required: true }),
      getInput("command", { required: true }),
      getBooleanInput("reaction"),
      getInput("reaction-type"),
      getBooleanInput("allow-edits"),
      getInput("permission-level") as PermissionLevel,
    ).process();
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    } else {
      throw error;
    }
  }
}

run();
