"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHandler = exports.defaultHandler = exports.newUrlHandler = exports.notFoundHandler = exports.handler = exports.redirectionHandler = exports.isHttps = void 0;
const url_1 = require("url");
const tls_1 = require("tls");
const fs_1 = require("fs");
const isHttps = (req) => {
    return req.socket instanceof tls_1.TLSSocket && req.socket.encrypted;
};
exports.isHttps = isHttps;
const redirectionHandler = (req, res) => {
    res.writeHead(302, {
        Location: "https://localhost:5005",
    });
    res.end();
};
exports.redirectionHandler = redirectionHandler;
const handler = async (req, resp) => {
    const protocol = (0, exports.isHttps)(req) ? "https" : "http";
    const parsedURL = new url_1.URL(req.url ?? "", `${protocol}://${req.headers.host}`);
    if (req.method !== "GET" || parsedURL.pathname == "/favicon.ico") {
        resp.writeHead(404, "Not Found");
        resp.end();
        return;
    }
    else {
        resp.writeHead(200, "OK");
        if (!parsedURL.searchParams.has("keyword")) {
            resp.write(`Hello,${protocol.toUpperCase()}`);
        }
        else {
            resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
        }
        resp.end();
        return;
    }
};
exports.handler = handler;
//To handle "Not Found"
const notFoundHandler = (req, resp) => {
    resp.sendStatus(404);
};
exports.notFoundHandler = notFoundHandler;
//To handle the "/newurl" page
const newUrlHandler = (req, resp) => {
    const msg = req.params.message ?? "(No Message)";
    resp.send(`Hello,${msg}`);
};
exports.newUrlHandler = newUrlHandler;
//To handle all other valid requests
const defaultHandler = (req, resp) => {
    if (req.query.keyword) {
        resp.send(`Hello,${req.query.keyword}`);
    }
    else {
        resp.send(`Hello,${req.protocol.toUpperCase()}`);
    }
};
exports.defaultHandler = defaultHandler;
const basicHandler = (req, resp) => {
    resp.write((0, fs_1.readFileSync)("src/index.html"));
    resp.end();
};
exports.basicHandler = basicHandler;
//# sourceMappingURL=handler.js.map