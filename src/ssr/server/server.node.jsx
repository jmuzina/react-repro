import React from "react";
import {renderToPipeableStream} from "react-dom/server";
import express from "express";
import EntryServer from "./entry-server.jsx";

const app = express();

// serve static files
app.use('/dist/client', express.static('dist/client'));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  // pipe rendered stream to response
  const {pipe} = renderToPipeableStream(<EntryServer/>, {
    onShellReady() {
      pipe(res);
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000/");
});