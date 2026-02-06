import { createMcpHandler } from "mcp-handler";
import path from "node:path";
import { registerTools } from "../server.js";

const handler = createMcpHandler(
  (server) => {
    const distDir = path.join(process.cwd(), "dist");
    registerTools(server, distDir);
  },
  { serverInfo: { name: "Excalidraw", version: "1.0.0" } },
  { basePath: "", maxDuration: 60, sessionIdGenerator: undefined },
);

export { handler as GET, handler as POST, handler as DELETE };
