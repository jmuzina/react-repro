import { renderToReadableStream } from 'react-dom/server';
import fs from "node:fs";
import path from "node:path";
import mime from "mime";
import EntryServer from "./entry-server";

const handler = async (req) => {
  let url = new URL(req.url);

  if (url.pathname.startsWith("/static")) {
    return new Response(fs.readFileSync(path.resolve(`./dist/client/${url.pathname.replace(/^\/static/, '')}`)), {
      headers: {
        "Content-Type": mime.getType(url.pathname) || "application/octet-stream"
      },
    });
  }

  const stream = await renderToReadableStream(<EntryServer />, { bootstrapScripts: ['./static/main.js']});

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html',
      'Transfer-Encoding': 'chunked'
    },
  });
};

Bun.serve({
  fetch: handler,
  port: 3000,
});

console.log(`Server running at http://localhost:3000/`);