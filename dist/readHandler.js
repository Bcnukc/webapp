"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = (req, resp) => {
    resp.cookie("sessionID", "mysceretcode");
    req.pipe(resp);
};
exports.readHandler = readHandler;
