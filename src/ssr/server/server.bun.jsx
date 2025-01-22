import {renderToReadableStream} from 'react-dom/server';
import EntryServer from "./entry-server";
import path from "node:path";

const cwd = process.cwd();

const handler = async (req) => {
  let url = new URL(req.url);

  // Serve static files
  if (url.pathname.startsWith("/dist/client/")) {
    const filepath = path.join(cwd, url.pathname);
    const file = Bun.file(filepath);
    return new Response(file);
  }
  
  const stream = await renderToReadableStream(<EntryServer/>);

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Transfer-Encoding': 'chunked'
    },
  });
};

Bun.serve({
  fetch: handler,
  port: 3000,
});

console.log(`Server running at http://localhost:3000/`);