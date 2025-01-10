import React from "react";
import {renderToPipeableStream} from "react-dom/server";
import express from "express";
import path from "node:path";
//@ts-ignore
import EntryServer from "./entry-server.jsx";

const app = express();

// app.get("/static/*", (req, res, next) => {
//   const url = new URL(req.url);
//   console.log(url, path.resolve(`./dist/client/${url.pathname.replace(/^\/static/, '')}`));
//   return express.static(path.resolve(`./dist/client/${url.pathname.replace(/^\/static/, '')}`))(req, res, next);
// })
//app.get("*.jsx", express.static(path.resolve("./dist/client")));

app.use('/static', express.static('dist/client'));
app.use('/dist/client', express.static('dist/client'));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Transfer-Encoding", "chunked");
  // res.set('X-Content-Type-Options', 'nosniff');
  // res.set('X-XSS-Protection', '1');
  // res.set('X-Frame-Options', 'deny');

  // @JUST_FOR_TEST
  //const forcedToOnAllReadyRender = req.query['render'] === 'onAllReady';

  /**
   * For SEO specifically, where the correct status code is extra important,
   * you can use onAllReady instead of onReadyToStream as the place
   * where you flush the stream. By that point, you'll definitely know if it errored or not.
   * However, that also delays when you start giving content to the bot,
   * and giving it earlier may give you better rankings due to perf.
   */
  //const useOnAllReadyRender = req.isSearchBot;
  // const reactSSRMethodName =
  //   forcedToOnAllReadyRender || useOnAllReadyRender ? 'onAllReady' : 'onShellReady';
  //const reactSSRMethodName = 'onShellReady';
  const { pipe } = renderToPipeableStream(<EntryServer />, {
    bootstrapScripts: ['./static/main.js'],
    onShellReady() {
      pipe(res);
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000/");
});