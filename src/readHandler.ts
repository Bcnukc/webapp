import { Request, Response } from "express";
import { Transform } from "stream"; // We need to import the Transform tool

export const readHandler = async (req: Request, resp: Response) => {
  if (req.headers["content-type"] == "application/json") {
    const payload = req.body;

    if (payload instanceof Array) {
      resp.json({ arraySize: payload.length });
    } else {
      resp.write("Did not receive an arraay");
    }
    resp.end();
  } else {
    req.pipe(resp);
  }
};
