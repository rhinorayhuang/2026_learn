import type { RequestHandler } from "express";
import { sendOk } from "../../utils/apiResponse";

export const getHealth: RequestHandler = (req, res) => {
    return sendOk(res, { status: 'ok' });
}