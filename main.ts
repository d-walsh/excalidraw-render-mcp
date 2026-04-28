/**
 * Entry point for the Excalidraw MCP server (stdio transport only).
 * Run with: node dist/index.js
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";
import { closeBrowser } from "./renderer.js";

async function main() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
}

async function shutdown() {
  await closeBrowser();
  process.exit(0);
}

process.on("SIGINT",  shutdown);
process.on("SIGTERM", shutdown);

main().catch((e) => {
  // Top-level crash — server.ts uncaughtException hook handles logging;
  // this catches errors thrown before the process-level hook is wired up.
  console.error("[excalidraw-render] fatal startup error:", e);
  process.exit(1);
});
