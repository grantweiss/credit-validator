import { Request, Response, Application } from "express";

export type ValidateCardRequest = { cardNumber: string };
export type CardResBody = {
  id: string;
  redactedCardNumber: string;
  isValid: boolean;
  message: string;
};

export type CardReq = Request<unknown, unknown, ValidateCardRequest>;
export type CardRes = Response<CardResBody>;
