import { Request } from "express";

export type ValidateCardRequest = { cardNumber: string };
export type CardReq = Request<unknown, unknown, ValidateCardRequest>;
