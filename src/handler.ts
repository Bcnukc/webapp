import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import { TLSSocket } from "tls";
import { Request, Response } from "express";
import { readFileSync } from "fs";

export const isHttps = (req: IncomingMessage): boolean => {
  return req.socket instanceof TLSSocket && req.socket.encrypted;
};

export const redirectionHandler = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  res.writeHead(302, {
    Location: "https://localhost:5005",
  });
  res.end();
};

export const handler = async (req: IncomingMessage, resp: ServerResponse) => {
  const protocol = isHttps(req) ? "https" : "http";

  const parsedURL = new URL(req.url ?? "", `${protocol}://${req.headers.host}`);
  if (req.method !== "GET" || parsedURL.pathname == "/favicon.ico") {
    resp.writeHead(404, "Not Found");
    resp.end();
    return;
  } else {
    resp.writeHead(200, "OK");
    if (!parsedURL.searchParams.has("keyword")) {
      resp.write(`Hello,${protocol.toUpperCase()}`);
    } else {
      resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
    }
    resp.end();
    return;
  }
};

//To handle "Not Found"

export const notFoundHandler = (req: Request, resp: Response) => {
  resp.sendStatus(404);
};

//To handle the "/newurl" page
export const newUrlHandler = (req: Request, resp: Response) => {
  const msg = req.params.message ?? "(No Message)";

  resp.send(`Hello,${msg}`);
};

//To handle all other valid requests

export const defaultHandler = (req: Request, resp: Response) => {
  if (req.query.keyword) {
    resp.send(`Hello,${req.query.keyword}`);
  } else {
    resp.send(`Hello,${req.protocol.toUpperCase()}`);
  }
};

export const basicHandler = (req: IncomingMessage, resp: ServerResponse) => {
  resp.write(readFileSync("src/index.html"));
  resp.end();
};
