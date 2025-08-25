import { Request, Response } from "express";

export const readHandler = (req: Request, resp: Response) => {
  resp.cookie("sessionID", "mysceretcode");
  req.pipe(resp);
};
