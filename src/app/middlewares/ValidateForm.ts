import { Request, Response, NextFunction } from "express";
import { success, failed } from "@util/responseParser";
const { validationResult } = require("express-validator");

export const ValidateForm = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  // Validate form from previous check() middleware
  if (!errors.isEmpty()) {
    return response.status(422).send(
      failed({
        name: "VALIDATION-ERROR",
        message: "Validation Error",
        data: errors.array(),
      })
    );
  }
  return next();
};
