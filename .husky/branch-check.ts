#!/usr/bin/env ts-node

import { execSync } from "child_process";

const BRANCH = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
const ALLOWED = ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"];
const errors: string[] = [];

if (!BRANCH.includes("/")) {
  errors.push(`❌ Branch must be in 'prefix/postfix' format, e.g., 'feat/my-new-feature'.`);
} else {
  const [prefix, postfix] = BRANCH.split("/", 2);
  if (!ALLOWED.includes(prefix)) errors.push(`❌ Invalid prefix '${prefix}'. Allowed: ${ALLOWED.join(" ")}.`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(postfix))
    errors.push(`❌ Invalid postfix '${postfix}'. Use lowercase letters, numbers, and hyphens (-) only. Example: 'my-new-feature'.`);
}

if (errors.length) {
  console.error(`🚫 Invalid branch name: '${BRANCH}'`);
  errors.forEach(e => console.error(e));
  process.exit(1);
}
